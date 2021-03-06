<template>
  <page>
    <template slot="title">
      {{ $t('PublishImage.PublishImage') }}
    </template>

    <template slot="body">
      <template v-if="publishing">
        <b-progress type="is-info"></b-progress>
      </template>
      <div v-show="!publishing">
        <b-field :label="$t('PublishImage.Title')">
          <b-input v-model="title"></b-input>
        </b-field>

        <b-field :label="$t('PublishImage.Description')">
          <b-input v-model="description" type="textarea"></b-input>
        </b-field>

        <b-field :label="$t('PublishImage.Feed')">
          <b-select v-model="feedId" :placeholder="$t('PublishImage.SelectAFeed')">
            <option
              v-for="feed in feeds"
              :value="feed.itemId"
              :key="feed.itemId">
              {{ feed.title }}
            </option>
          </b-select>
        </b-field>

        <token-selector v-model="tokenItemId"></token-selector>
        <topic-selector v-model="topics"></topic-selector>
        <mention-selector v-model="mentions"></mention-selector>
        <image-edit v-model="imageMixin" ref="imageEdit"></image-edit>

        <button class="button is-primary" @click="publish">{{ $t('PublishImage.Publish') }}</button>
      </div>
    </template>
  </page>
</template>

<script lang="ts">
  import Vue from 'vue'
  import Page from '../Page.vue'
  import ImageEdit from '../mixins/ImageEdit.vue'
  import TokenSelector from '../TokenSelector.vue'
  import TopicSelector from '../TopicSelector.vue'
  import MentionSelector from '../MentionSelector.vue'
  let LanguageMixinProto: any = require('../../../lib/protobuf/LanguageMixin_pb.js')
  let TitleMixinProto: any = require('../../../lib/protobuf/TitleMixin_pb.js')
  let BodyTextMixinProto: any = require('../../../lib/protobuf/BodyTextMixin_pb.js')
  import MixItem from '../../../lib/MixItem'
  import MixContent from '../../../lib/MixContent'
  import setTitle from '../../../lib/setTitle'
  import bs58 from 'bs58'

  export default Vue.extend({
    name: 'publish-image',
    components: {
      Page,
      ImageEdit,
      TokenSelector,
      TopicSelector,
      MentionSelector,
    },
    data() {
      return {
        publishing: false,
        title: '',
        description: '',
        tokenItemId: '',
        feeds: [{itemId: '0', title: 'none'}],
        feedId: '0',
        topics: [],
        mentions: [],
        imageMixin: null,
      }
    },
    async created() {
      setTitle(this.$t('PublishImage.PublishImage'))

      let feeds = await this.$activeAccount.get().call(this.$mixClient.accountFeeds, 'getAllItems')
      for (let itemId of feeds) {
        try {
          let item = await new MixItem(this.$root, itemId).init()
          let revision = await item.latestRevision().load()

          this.feeds.push({
            itemId: itemId,
            title: revision.getTitle(),
          })
        }
        catch (e) {}
      }
    },
    methods: {
      async publish(event: any) {
        this.publishing = true
        try {
          let flagsNonce = '0x0f' + this.$mixClient.web3.utils.randomHex(31).substr(2)
          let itemId = await this.$activeAccount.get().call(this.$mixClient.itemStoreIpfsSha256, 'getNewItemId', [this.$activeAccount.get().contractAddress, flagsNonce])

          let content = new MixContent(this.$root)

          // Image
          content.addMixinPayload('0x045eee8c', await this.$refs.imageEdit.save())

          // Language
          let languageMessage = new LanguageMixinProto.LanguageMixin()
          languageMessage.setLanguageTag(this.$settings.get('locale'))
          content.addMixinPayload('0x9bc7a0e6', languageMessage.serializeBinary())

          // Title
          let titleMessage = new TitleMixinProto.TitleMixin()
          titleMessage.setTitle(this.title)
          content.addMixinPayload('0x344f4812', titleMessage.serializeBinary())

          // Body text
          let bodyTextMessage = new BodyTextMixinProto.BodyTextMixin()
          bodyTextMessage.setBodyText(this.description)
          content.addMixinPayload('0x2d382044', bodyTextMessage.serializeBinary())

          let ipfsHash = await content.save()

          if (this.tokenItemId != '') {
            await this.$activeAccount.get().sendData(this.$mixClient.itemDagTokenItems, 'addChild', [this.tokenItemId, '0x26b10bb026700148962c4a948b08ae162d18c0af', flagsNonce], 0, 'Attach token item')
          }

          if (this.feedId != '0') {
            await this.$activeAccount.get().sendData(this.$mixClient.itemDagFeedItems, 'addChild', [this.feedId, '0x26b10bb026700148962c4a948b08ae162d18c0af', flagsNonce], 0, 'Attach feed item')
          }

          for (let topic of this.topics) {
            let topicHash = this.$mixClient.web3.utils.keccak256(topic)
            try {
              await this.$activeAccount.get().call(this.$mixClient.itemTopics, 'getTopic', [topicHash])
            }
            catch (e) {
              await this.$activeAccount.get().sendData(this.$mixClient.itemTopics, 'createTopic', [topic], 0, 'Create topic.')
            }
            await this.$activeAccount.get().sendData(this.$mixClient.itemTopics, 'addItem', [topicHash, '0x26b10bb026700148962c4a948b08ae162d18c0af', flagsNonce], 0, 'Add item to topic.')
          }

          for (let mention of this.mentions) {
            await this.$activeAccount.get().sendData(this.$mixClient.itemMentions, 'addItem', [mention.account, '0x26b10bb026700148962c4a948b08ae162d18c0af', flagsNonce], 0, 'Add item mention to account.')
          }

          await this.$activeAccount.get().sendData(this.$mixClient.itemStoreIpfsSha256, 'create', [flagsNonce, ipfsHash], 0, 'Create image')
          let encodedItemId = bs58.encode(Buffer.from(this.$mixClient.web3.utils.hexToBytes(itemId.substr(0, 50))))
          this.$router.push({ name: 'item', params: { encodedItemId: encodedItemId }})
        }
        catch (e) {
          this.publishing = false
        }
      }
    },
  })
</script>
