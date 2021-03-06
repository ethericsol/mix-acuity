let ImageMixinProto: any = require('../../lib/protobuf/ImageMixin_pb.js')
import bs58 from 'bs58'
let pica = require('pica/dist/pica')()

export default class MixImage {
  vue: any
  file: any

  constructor(vue: any, file: any) {
    this.vue = vue
    this.file = file
  }

  createMipmap(source: any, outWidth: number, outHeight: number) {
    return new Promise(async (resolve, reject) => {
      let dest = document.createElement('canvas')
      dest.width = outWidth
      dest.height = outHeight
      await pica.resize(source, dest)

      dest.toBlob(async (blob: any) => {
        let buf = await blob.arrayBuffer()
        let hash = await this.vue.$ipfsClient.add(Buffer.from(buf))
        resolve({hash: hash, size: buf.byteLength})
      }, 'image/jpeg')
    })
  }

  createMixin() {
    return new Promise(async (resolve, reject) => {
      let img = new Image();
      img.onload = () => {
        let mipmaps: any[] = []
        let source: any = document.createElement('canvas')
        source.width = img.width
        source.height = img.height
        source.getContext('2d').drawImage(img, 0, 0, source.width, source.height)
        source.toBlob(async (blob: any) => {
          let buf = await blob.arrayBuffer()
          let hash = await this.vue.$ipfsClient.add(Buffer.from(buf))
          mipmaps.push({hash: hash, size: buf.byteLength})

          let level = 1, outWidth, outHeight
          do {
            let scale = 2 ** level
            outWidth = Math.round(img.width / scale)
            outHeight = Math.round(img.height / scale)
            mipmaps.push(await this.createMipmap(source, outWidth, outHeight))
            level++
          }
          while (outWidth > 64 && outHeight > 64)

          let imageMessage = new ImageMixinProto.ImageMixin()
          imageMessage.setWidth(img.width)
          imageMessage.setHeight(img.height)
          for (let mipmap of mipmaps) {
            let mipmapLevelMessage = new ImageMixinProto.MipmapLevel()
            mipmapLevelMessage.setFilesize(mipmap.size)
            mipmapLevelMessage.setIpfsHash(bs58.decode(mipmap.hash))
            imageMessage.addMipmapLevel(mipmapLevelMessage)
          }

          resolve(imageMessage.serializeBinary())

        }, 'image/jpeg')
      }
      img.src = URL.createObjectURL(this.file)
    })
  }
}
