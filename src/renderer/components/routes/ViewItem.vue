<template>
  <page>
    <template slot="title">
      <div class="avatar is-pulled-left">
        <ipfs-image :ipfsHash="avatar" :key="avatar"></ipfs-image>
      </div>
      <span v-if="isFeed">Feed: </span>
      <span v-if="isProfile">Profile: </span>
      <span v-if="isToken">Token: </span>
      <item-link v-if="short" :itemId="itemId"></item-link>
      <span v-else>{{ title }}</span>
      <span v-if="isDesktop" @click="copyItemId" class="clickable mdi mdi-24px mdi-link">
      </span>
      <span
        v-if="!short && editable"
        @click="toggleEdit"
        class="clickable mdi mdi-24px mdi-square-edit-outline">
      </span>
      <span v-if="isFeed">
        <button v-if="!isSubscribed" class="button is-primary" @click="subscribe">{{ $t('ViewItem.Subscribe') }}</button>
        <button v-if="isSubscribed" class="button is-primary" @click="unsubscribe">{{ $t('ViewItem.Unsubscribe') }}</button>
      </span>
      <span v-if="isToken">
        <button v-if="!isPortfolio" class="button is-primary" @click="portfolio">{{ $t('ViewItem.Add') }}</button>
        <button v-if="isPortfolio" class="button is-primary" @click="unportfolio">{{ $t('ViewItem.Remove') }}</button>
      </span>
    </template>

    <template slot="subtitle">
      {{ $t('ViewItem.by') }} <profile-link :address="ownerAddress"></profile-link>&ensp;
      <span
        @mouseover="ownerTrustedClassCurrent = ownerTrustedClassHover"
        @mouseleave="ownerTrustedClassCurrent = ownerTrustedClass"
        :class="ownerTrustedClassCurrent" class="clickable mdi mdi-24px"
        @click="toggleTrust"></span><br /><br />
      <span v-if="inFeed">{{ $t('ViewItem.Feeds') }}: <router-link :to="feedRoute">{{ feed }}</router-link><br /></span>
      <span v-if="topics.length > 0"><span class="topics">{{ $t('ViewItem.Topics') }}: <span v-for="topic in topics" class="topic"><router-link  :key="topic.hash" :to="topic.route">{{ topic.topic }}</router-link></span></span><br /></span>
      <span v-if="mentions.length > 0"><span class="topics">{{ $t('ViewItem.Mentions') }}: <span v-for="mention in mentions" class="topic"><profile-link :address="mention"></profile-link></span></span><br /></span>
      {{ published }}
      <div v-if="isOwnProfile"><router-link to="/profile/edit">{{ $t('ViewItem.EditProfile') }}</router-link></div>
    </template>
    <template slot="body">
      <div class="columns">
        <div class="column">
          <div class="image">
            <ipfs-image v-if="!videoMessage || short" :ipfsHash="image" :key="image"></ipfs-image>
          </div>
          <div v-if="hasFile" class="file">
            <span v-if="!hasDownloaded" class="download" v-html="downloadIcon" v-on:click="downloadFile" ></span>
            <span v-if="hasDownloaded" class="check" v-html="checkIcon" ></span>
            {{ fileName }} <br/>
            {{ $t('ViewItem.Size') }}: {{ fileSize }}
          </div>
          <video-view v-if="videoMessage && !short" :message="videoMessage" :posterIpfsHash="videoPosterIpfsHash"></video-view>
          <div class="bodyText"><vue-markdown class="markdown" :anchorAttributes="{target:'_blank'}" :source="description"></vue-markdown></div>
          <account-info v-if="isProfile" :address="ownerAddress"></account-info>
        </div>
        <div v-if="editing" class="column">
          <b-field :label="$t('ViewItem.Title')">
            <b-input v-model="title"></b-input>
          </b-field>

          <b-field :label="$t('ViewItem.Description')">
            <b-input v-model="description" type="textarea" rows="20"></b-input>
          </b-field>

          <button class="button is-primary" @click="publish">{{ $t('ViewItem.Publish') }}</button>
        </div>
      </div>

      <reactions v-if="!isFeed" :itemId="itemId"></reactions>

      <div v-if="!short">
        <token-view v-if="isToken" :itemId="itemId"></token-view>

        <item-token :itemId="itemId"></item-token>

        <div v-if="isFeed">
          <view-item v-for="itemId in feedItemIds" :short="true" :trust="true" :hexItemId="itemId" :key="itemId"></view-item>
        </div>
        <div v-else>
          <comment v-for="itemId in commentIds" :itemId="itemId" :key="itemId"></comment>

          <div v-if="startReply">
            <b-input v-model="reply" type="textarea" class="comment-box"></b-input>
            <button class="button is-primary" @click="publishReply">{{ $t('ViewItem.Reply') }}</button>
            <button class="button" @click="startReply = false">{{ $t('ViewItem.Close') }}</button>
          </div>
          <div v-else>
            <button class="button is-primary" @click="startReply = true">{{ $t('ViewItem.Reply') }}</button>
          </div>
        </div>
      </div>
    </template>
  </page>
</template>

<script lang="ts">
  import Vue from 'vue'
  import MixItem from '../../../lib/MixItem'
  import MixContent from '../../../lib/MixContent'
  import Comment from '../Comment.vue'
  import AccountInfo from '../AccountInfo.vue'
  import ItemLink from '../ItemLink.vue'
  import ProfileLink from '../ProfileLink.vue'
  import IpfsImage from '../IpfsImage.vue'
  import Page from '../Page.vue'
  import Reactions from '../Reactions.vue'
  import ItemToken from '../ItemToken.vue'
  import TokenView from '../mixins/TokenView.vue'
  import VideoView from '../mixins/VideoView.vue'
  let VueMarkdown: any = require('vue-markdown-v2').default
  let TitleMixinProto: any = require('../../../lib/protobuf/TitleMixin_pb.js')
  let BodyTextMixinProto: any = require('../../../lib/protobuf/BodyTextMixin_pb.js')
  let LanguageMixinProto: any = require('../../../lib/protobuf/LanguageMixin_pb.js')
  let VideoMixinProto: any = require ('../../../lib/protobuf/VideoMixin_pb.js')
//  import formatByteCount from '../../../lib/formatByteCount'
//  import File from '../../../lib/File.js'
  import twemoji from 'twemoji'
  import setTitle from '../../../lib/setTitle'
  import clipboard from '../../../lib/clipboard'
  import bs58 from 'bs58'

  export default Vue.extend({
    name: 'view-item',
    props: {
      encodedItemId: {
        type: String,
        required: false,
      },
      hexItemId: {
        type: String,
        required: false,
      },
      short: {
        type: Boolean,
        default: false,
        required: false,
      },
      trust: {
        type: Boolean,
        default: false,
        required: false,
      },
    },
    components: {
      Page,
      Comment,
      AccountInfo,
      ItemLink,
      ProfileLink,
      ItemToken,
      TokenView,
      VideoView,
      VueMarkdown,
      Reactions,
      IpfsImage,
    },
    data() {
      let data: any = {}
      data.isDesktop = this.$isDesktop
      data.avatar = ''
      data.title = ''
      data.editable = false
      data.editing = false
      data.editForm = ''
      data.isSubscribed = false
      data.isPortfolio = false
      data.ownerAddress = null
      data.owner = ''
      data.ownerRoute = ''
      data.ownerTrustedClass = ''
      data.ownerTrustedClassHover = ''
      data.ownerTrustedClassCurrent = ''
      data.inFeed = false
      data.feed = ''
      data.feedRoute = ''
      data.topics = []
      data.mentions = []
      data.published = ''
      data.image = ''
      data.description = ''
      data.hasFile = false
      data.file = null
      data.fileName = ''
      data.fileSize = ''
      data.fileHash = ''
      data.videoPosterIpfsHash = null
      data.videoMessage = null
      data.isProfile = ''
      data.isOwnProfile = false
      data.isFeed = false
      data.isToken = false
      data.commentIds = []
      data.feedItemIds = []
      data.reply = ''
      data.startReply = false
      data.hasDownloaded = false
      data.downloadIcon = twemoji.parse(twemoji.convert.fromCodePoint('2B07'), {folder: 'svg', ext: '.svg'})
      data.checkIcon = twemoji.parse(twemoji.convert.fromCodePoint('2714'), {folder: 'svg', ext: '.svg'})
      return data
    },
    computed: {
      itemId() {
        if (this.hexItemId != null) {
          return this.hexItemId
        }
        else {
          return '0x' + bs58.decode(this.encodedItemId).toString('hex') + 'f1b5847865d2094d'
        }
      }
    },
    created() {
      this.itemStoreIpfsSha256Emitter = this.$mixClient.itemStoreIpfsSha256.events.allEvents({
        toBlock: 'pending',
        topics: [, this.itemId],
      })
      .on('data', (log: any) => {
        if (!this.editing) {
          this.loadData()
        }
      })
      .on('changed', (log: any) => {
        if (!this.editing) {
          this.loadData()
        }
      })

      this.itemDagCommentsEmitter = this.$mixClient.itemDagComments.events.allEvents({
        toBlock: 'pending',
        topics: [, this.itemId],
      })
      .on('data', (log: any) => {
        if (!this.editing) {
          this.loadData()
        }
      })
      .on('changed', (log: any) => {
        if (!this.editing) {
          this.loadData()
        }
      })

      this.loadData()
    },
    destroyed() {
      this.itemStoreIpfsSha256Emitter.unsubscribe()
      this.itemDagCommentsEmitter.unsubscribe()
    },
    watch: {
      encodedItemId() {
        this.resetData(this)
        this.loadData()
      },
      hexItemId() {
        this.resetData(this)
        this.loadData()
      },
    },
    methods: {
      resetData(data: any) {
        data.isDesktop = this.$isDesktop
        data.avatar = ''
        data.title = ''
        data.editable = false
        data.editing = false
        data.editForm = ''
        data.isSubscribed = false
        data.isPortfolio = false
        data.ownerAddress = null
        data.owner = ''
        data.ownerRoute = ''
        data.ownerTrustedClass = ''
        data.ownerTrustedClassHover = ''
        data.ownerTrustedClassCurrent = ''
        data.inFeed = false
        data.feed = ''
        data.feedRoute = ''
        data.topics = []
        data.mentions = []
        data.published = ''
        data.image = ''
        data.description = ''
        data.hasFile = false
        data.file = null
        data.fileName = ''
        data.fileSize = ''
        data.fileHash = ''
        data.videoPosterIpfsHash = null
        data.videoMessage = null
        data.isProfile = ''
        data.isOwnProfile = false
        data.isFeed = false
        data.isToken = false
        data.commentIds = []
        data.feedItemIds = []
        data.reply = ''
        data.startReply = false
        data.hasDownloaded = false
        data.downloadIcon = twemoji.parse(twemoji.convert.fromCodePoint('2B07'), {folder: 'svg', ext: '.svg'})
        data.checkIcon = twemoji.parse(twemoji.convert.fromCodePoint('2714'), {folder: 'svg', ext: '.svg'})
      },
      async loadData() {
        let item = await new MixItem(this.$root, this.itemId).init()
        let account = await item.account()
        this.ownerAddress = account.contractAddress
        let trustLevel = await item.getTrustLevel()
        if (trustLevel != 1) {
          let trustLevelToggled = await item.getTrustLevelToggled()
          this.ownerTrustedClass = trustLevel ? (trustLevel == 2 ? 'mdi-verified' : 'mdi-shield') : 'mdi-shield-outline'
          this.ownerTrustedClassHover = trustLevelToggled ? (trustLevelToggled == 2 ? 'mdi-verified' : 'mdi-shield') : 'mdi-shield-outline'
          this.ownerTrustedClassCurrent = this.ownerTrustedClass
        }
        else {
          this.editable = item.isUpdatable()
        }

        let profileItemId = await account.call(this.$mixClient.accountProfile, 'getProfile')
        this.ownerRoute = '/item/' + profileItemId
        let profileItem = await new MixItem(this.$root, profileItemId).init()
        let profileRevision = await profileItem.latestRevision().load()
        this.owner = profileRevision.getTitle()
        this.avatar = profileRevision.getImage(64, 64)

        let feedIds = await this.$mixClient.itemDagFeedItems.methods.getAllParentIds(this.itemId).call()
        if (feedIds.length > 0) {
          this.feedRoute = '/item/' + bs58.encode(Buffer.from(this.$mixClient.web3.utils.hexToBytes(feedIds[0].substr(0, 50))))
          let feedItem = await new MixItem(this.$root, feedIds[0]).init()
          let feedRevision = await feedItem.latestRevision().load()
          this.feed = feedRevision.getTitle()
          this.inFeed = true
        }

        let topicHashes = await this.$mixClient.itemTopics.methods.getItemTopicHashes(this.itemId).call()
        let topics: any[] = []
        for (let topicHash of topicHashes) {
          topics.push({
            hash: topicHash,
            route: '/topic/' + topicHash,
            topic: await this.$mixClient.itemTopics.methods.getTopic(topicHash).call(),
          })
        }
        this.topics = topics

        this.mentions = await this.$mixClient.itemMentions.methods.getItemMentions(this.itemId).call()
        this.commentIds = await this.$mixClient.itemDagComments.methods.getAllChildIds(this.itemId).call()
        this.feedItemIds = (await this.$mixClient.itemDagFeedItems.methods.getAllChildIds(this.itemId).call()).reverse()

        if (this.short && !trustLevel && !this.trust) {
          this.title = ''
          this.description = this.$t('ViewItem.AuthorNotTrusted')
          return
        }

        let firstRevision = await item.firstRevision().load()
        let revision = await item.latestRevision().load()

        if (revision.content.existMixin('0xbeef2144')) {
          this.isProfile = true
          if (await this.$activeAccount.get().getProfile() == this.itemId) {
            this.isOwnProfile = true
          }
        }
        else if (revision.content.existMixin('0xbcec8faa')) {
          this.isFeed = true
          try {
            await this.$db.get('/accountSubscribed/' + this.$activeAccount.get().contractAddress + '/' + this.itemId)
            this.isSubscribed = true
          }
          catch (e) {}
        }
        else if (revision.content.existMixin('0x9fbbfaad')) {
          this.isToken = true
          try {
            await this.$db.get('/accountPortfolio/' + this.$activeAccount.get().contractAddress + '/' + this.itemId)
            this.isPortfolio = true
          }
          catch (e) {}
        }

        try {
          this.title = revision.getTitle()
          if (!this.short) {
            setTitle(this.title)
          }
          let timestamp = firstRevision.getTimestamp()
          this.published = this.$t('ViewItem.Published') + ': ' + ((timestamp > 0) ? new Date(timestamp * 1000).toLocaleDateString() : this.$t('ViewItem.JustNow'))
          if (!this.isProfile) {
            this.image = revision.getImage(512)
          }
          this.description = revision.getBodyText()
        }
        catch (e) {}
/*
        if (revision.content.existMixin('0x3c5bba9c')) {
          this.hasFile = true
          let fileData = revision.getFile()
          this.file = new File(this.$root, fileData.name, fileData.size, fileData.hash)
          this.fileName = fileData.name
          this.fileSize = formatByteCount(fileData.size)
          this.fileHash = fileData.hash
        }
*/

        if (revision.content.existMixin('0x51108feb')) {
          this.videoPosterIpfsHash = revision.getImage(1024)
          this.videoMessage = VideoMixinProto.VideoMixin.deserializeBinary(revision.content.getPayloads('0x51108feb')[0])
        }

        if (!this.short) {
          // Try to delete the old entry
          try {
            let id = await this.$db.get('/historyIndex/' + this.itemId)
            await this.$db.del('/history/' + id)
          }
          catch (e) {}

          let id
          try {
            id = parseInt(await this.$db.get('/historyCount'))
          }
          catch (e) {
            id = 0
          }

          this.$db.batch()
          .put('/history/' + id, JSON.stringify({
            itemId: this.itemId,
            timestamp: Date.now(),
            title: this.title,
            owner: this.owner,
            ownerRoute: this.ownerRoute,
          }))
          .put('/historyIndex/' + this.itemId, id)
          .put('/historyCount', id + 1)
          .write()
        }
      },
      copyItemId(event: any) {
        clipboard.writeText(bs58.encode(Buffer.from(this.$mixClient.web3.utils.hexToBytes(this.itemId.substr(0, 50)))))
        this.$buefy.toast.open(this.$t('ViewItem.ItemIdCopied'))
      },
      async toggleEdit(event: any) {
        this.editing = !this.editing
        if (!this.editing) {
          this.loadData()
        }
      },
      async subscribe(event: any) {
        await this.$db.put('/accountSubscribed/' + this.$activeAccount.get().contractAddress + '/' + this.itemId, this.itemId)
        this.isSubscribed = true
      },
      async unsubscribe(event: any) {
        await this.$db.del('/accountSubscribed/' + this.$activeAccount.get().contractAddress + '/' + this.itemId)
        this.isSubscribed = false
      },
      async portfolio(event: any) {
        await this.$db.put('/accountPortfolio/' + this.$activeAccount.get().contractAddress + '/' + this.itemId, this.itemId)
        this.isPortfolio = true
      },
      async unportfolio(event: any) {
        await this.$db.del('/accountPortfolio/' + this.$activeAccount.get().contractAddress + '/' + this.itemId)
        this.isPortfolio = false
      },
      async publish(event: any) {
        let item = await new MixItem(this.$root, this.itemId).init()
        let revision = await item.latestRevision().load()

        // Title
        let titleMessage = new TitleMixinProto.TitleMixin()
        titleMessage.setTitle(this.title)
        revision.content.removeMixins('0x344f4812')
        revision.content.addMixinPayload('0x344f4812', titleMessage.serializeBinary())

        // Body text
        let bodyTextMessage = new BodyTextMixinProto.BodyTextMixin()
        bodyTextMessage.setBodyText(this.description)
        revision.content.removeMixins('0x2d382044')
        revision.content.addMixinPayload('0x2d382044', bodyTextMessage.serializeBinary())

        let ipfsHash = await revision.content.save()
        this.editing = false
        await this.$activeAccount.get().sendData(this.$mixClient.itemStoreIpfsSha256, 'createNewRevision', [this.itemId, ipfsHash], 0, 'Update item')
      },
      async publishReply(event: any) {
        let content = new MixContent(this.$root)

        // Language
        let languageMessage = new LanguageMixinProto.LanguageMixin()
        languageMessage.setLanguageTag(this.$settings.get('locale'))
        content.addMixinPayload('0x9bc7a0e6', languageMessage.serializeBinary())

        // BodyText
        let bodyTextMessage = new BodyTextMixinProto.BodyTextMixin()
        bodyTextMessage.setBodyText(this.reply)
        content.addMixinPayload('0x2d382044', bodyTextMessage.serializeBinary())

        let ipfsHash = await content.save()
        let flagsNonce = '0x00' + this.$mixClient.web3.utils.randomHex(31).substr(2)
        await this.$activeAccount.get().sendData(this.$mixClient.itemDagComments, 'addChild', [this.itemId, '0x26b10bb026700148962c4a948b08ae162d18c0af', flagsNonce], 0, 'Attach comment')
        await this.$activeAccount.get().sendData(this.$mixClient.itemStoreIpfsSha256, 'create', [flagsNonce, ipfsHash], 0, 'Post comment')
        this.reply = ''
        this.startReply = false
        this.loadData()
      },
      async downloadFile() {
//        this.file.download()
        this.hasDownloaded = true
      },
      toggleTrust(event: any) {
        new MixItem(this.$root, this.itemId).init()
        .then(item => {
          return item.account()
        })
        .then(account => {
          this.$activeAccount.get().call(this.$mixClient.trustedAccounts, 'getIsTrusted', [account.contractAddress])
          .then((trusted: boolean) => {
            if (trusted) {
              return this.$activeAccount.get().sendData(this.$mixClient.trustedAccounts, 'untrustAccount', [account.contractAddress], 0, 'Untrust account')
            }
            else {
              return this.$activeAccount.get().sendData(this.$mixClient.trustedAccounts, 'trustAccount', [account.contractAddress], 0, 'Trust account')
            }
          })
          .then(() => {
            this.loadData()
          })
        })
      },
    },
  })
</script>

<style scoped>
  .clickable {
    cursor: pointer;
    user-select: none;
  }

  .avatar {
    margin-right: 10px;
  }

  .avatar >>> img {
    object-fit: cover;
    width: 64px;
    height: 64px;
  }

  .image {
    width: 512px;
  }

  .comment-box {
    margin: 10px 0;
  }

  .download >>> img {
    cursor: pointer;
    height: 2.5em;
    width: 2.5em;
    margin-top: 0.3em;
    margin-right: 15px;
  }

  .check >>> img {
    height: 2.5em;
    width: 2.5em;
    margin-top: 0.3em;
    margin-right: 15px;
  }

  .button {
    margin-right:10px;
  }

  .topics >>> .topic::after {
    content: ", ";
  }

  .topics >>> .topic:last-child::after {
    content: "";
  }

</style>
