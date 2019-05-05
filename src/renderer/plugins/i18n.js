import Vue from 'vue';
import VueI18n from 'vue-i18n';

Vue.use(VueI18n);

const messages = {
  'en': {
    //Nav Panel
    general: 'General',
    home: 'Home',
    myFeeds: 'My Feeds',
    subscriptions: 'Subscriptions',
    interactions: 'Interactions',
    browsingHistory: 'Browsing History',
    publishItem: 'Publish Item',
    goTo: 'Goto',
    account: 'Account',
    transactionHistory: 'Transaction History',
    profile: 'Profile',
    trustedAccounts: 'Trusted Accounts',
    wallet: 'Wallet',
    tokens: 'Tokens',
    administration: 'Administration',
    accounts: 'Accounts',
    nodeStatus: 'Node Status',
    settings: 'Settings',
    debug: 'Debug',
    //Publish Item
    publishMixin: 'Publish Mixin Type',
    publishImage: 'Publish Image',
    publishFeed: 'Publish Feed',
    //GoTo
    itemId: 'ItemId',
    //Transaction History
    when: 'When',
    description: 'Description',
    receiver: 'Receiver',
    fee: 'Fee',
    amount: 'Amount',
    updateProfile: 'Update profile',
    setProfileItem: 'Set profile item',
    createProfileItem: 'Create profile item',
    //Profile
    editProfile: 'Edit profile',
    accountType: 'Account type',
    bio: 'Bio',
    location: 'Location',
    publish: 'Publish',
    //Wallet
    balance: 'Balance',
    unconfirmedBalance: 'Unconfirmed Balance',
    transactions: 'Transactions',
    send: 'Send',
    to: 'To',
    //Tokens
    symbol: 'Symbol',
    name: 'Name',
    dailyPayout: 'Daily Payout',
    chooseImage: 'Choose Image',
    create: 'Create',
    //Accounts
    lock: 'Lock',
    activate: 'Activate',
    createAccount: 'Create account',
    recoverAccount: 'Recover account',
    //Node Status
    mixBlockchain: 'MIX Blockchain',
    web3Version: 'Web3 version',
    protocolVersion: 'Protocol version',
    networkId: 'Network ID',
    blockNumber: 'Block number',
    peerCount: 'Peer count',
    catchingUp: 'Catching up',
    clockSync: 'Clock sync',
    timeDrift: 'Time drift',
    agent: 'Agent',
    protocol: 'Protocol',
    addresses: 'Addresses',
    repoSize: 'Repo size',
    repoObjectCount: 'Repo object count',
    //Settings
    language: 'Language',
    //Debug
    readItem:'Read item'

  },
  'ru': {
    general: 'Общие',
    home: 'Домой',
    myFeeds: 'Мои каналы',
    subscriptions: 'Подписки',
    interactions: 'Взаимосвязи',
    browsingHistory: 'История браузера',
    publishItem: 'Опубликовать',
    goTo: 'Перейти к',
    account: 'Аккаунт',
    transactionHistory: 'История транзакций',
    profile: 'Профиль',
    trustedAccounts: 'Доверенные аккаунты',
    wallet: 'Кошелек',
    tokens: 'Токены',
    administration: 'Администрирование',
    accounts: 'Аккаунт',
    nodeStatus: 'Статус подключения',
    settings: 'Настройки',
    debug: 'Отладка',
    //Publish Item
    publishMixin: 'Опубликовать смешанный тип',
    publishImage: 'Опубликовать картинку',
    publishFeed: 'Опуликовать новость',
    //GoTo
    itemId: 'Идентификатор контента (ItemId)',
    //Transaction History
    when: 'Когда',
    description: 'Описание',
    receiver: 'Получатель',
    fee: 'Комиссия',
    amount: 'Сумма',
    updateProfile: 'Обновить профиль',
    setProfileItem: 'Настройки  элемента профиля',
    createProfileItem: 'Создать элемент профиля',
    //Profile
    editProfile: 'Редактировать профиль',
    accountType: 'Тип аккаунта',
    bio: 'О себе',
    location: 'Местоположение',
    publish: 'Опубликовать',
    //Wallet
    balance: 'Баланс',
    unconfirmedBalance: 'Неподтвержденный баланс',
    transactions: 'Транзакции',
    send: 'Отправить',
    to: 'Куда',
    //Tokens
    symbol: 'Символ',
    name: 'Название',
    dailyPayout: 'Ежедневная выплата',
    chooseImage: 'Выбрать изображение',
    create: 'Создать',
    //Accounts
    lock: 'заблокировать',
    activate: 'активировать',
    createAccount: 'Создать аккаунт',
    recoverAccount: 'Восстановить аккаунт',
    //Node Status
    mixBlockchain: 'MIX Blockchain',
    web3Version: 'Web3 версия',
    protocolVersion: 'Версия протокола',
    networkId: 'Network ID',
    blockNumber: 'Номер блока',
    peerCount: 'Количество узлов',
    catchingUp: 'Догоняющий блокчей',
    clockSync: 'Синхронизация времени',
    timeDrift: 'Смещение времени',
    agent: 'Агент',
    protocol: 'Протокол',
    addresses: 'Адреса',
    repoSize: 'Размер хранилища',
    repoObjectCount: 'Количество объектов в хранилище',
    //Settings
    language: 'Язык',
    //Debug
    readItem:'Получить сведения'
  }
}

const i18n = new VueI18n({
    locale: 'en', // set locale
    fallbackLocale: 'ru', // set fallback locale
    messages, // set locale messages
  });

export default i18n;