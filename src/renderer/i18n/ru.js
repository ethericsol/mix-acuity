// Russian

export default {
	App: {
		General: 'Общие',
		Home: 'Главная',
		MyFeeds: 'Мои каналы',
		Subscriptions: 'Подписки',
		Interactions: 'Публикации со мной',
		BrowsingHistory: 'История браузера',
		Downloads: 'Загрузки',
		PublishItem: 'Опубликовать',
		GotoItem: 'Перейти к itemId',
		Account: 'Аккаунт',
		TransactionHistory: 'История транзакций',
		Profile: 'Профиль',
		TrustedAccounts: 'Кому доверяю',
		Wallet: 'Кошелек',
		Tokens: 'Токены',
		Administration: 'Администрирование',
		Accounts: 'Аккаунты',
		NodeStatus: 'Статус подключения',
		Mining: 'Майнинг',
		Settings: 'Настройки',
		DebugItem: 'Отладка',
	},
	AccountInfo: {
		Feeds: 'Каналы пользователя',
		TrustedThatTrust: 'Профилю доверяют те, кому доверяю я',
		Trusts: 'Кому доверяет',
		VisibilityOverride: 'Переопределить доступность контента пользователя',
		Whitelist: 'В белый список',
		Blacklist: 'В черный список',
		Token: 'Токены',
		Balance: 'Баланс',
		Address: 'Адрес кошелька',
	},
	BrowsingHistory: {
		BrowsingHistory: 'История браузера',
		LastAccess: 'Последнее посещение',
		Item: 'Страница',
		Author: 'Автор',
	},
	CreateToken: {
		CreateToken: 'Создать токен',
		Symbol: 'Cимвольное обозначение',
		Name: 'Название',
		Description: 'Описание',
		InitialBalance: 'Начальный баланс',
		DailyPayout: 'Ежедневная выплата',
		ChooseImage: 'Выбрать картинку',
		Create: 'Создать',
	},
	Debug: {
		DebugItem: 'Debug Item',
		ReadItem: 'ReadItem',
		itemStoreNotFound: 'itemStore not found.',
		ItemNotFound: 'Item not found.',
		UnsupportedItemStore: 'Unsupported itemStore.',
		Updatable: 'Updatable',
		EnforceRevisions: 'Enforce revisions',
		Retractable: 'Retractable',
		Transferable: 'Transferable',
		Owner: 'Owner',
		RevisionCount: 'Revision count',
		Revision: 'Revision',
		Timestamp: 'Timestamp',
		IpfsHash:  'IPFS hash',
		CompressedLength: 'Compressed length',
		UncompressedLength: 'Uncompressed length',
		MixinCount: 'Mixin count',
		MixinType: 'Mixin type',
		LanguageTag: 'Language tag',
		Title: 'Title',
		BodyText: 'Body text',
		MixinSchema: 'Mixin schema',
		Image: 'Image',
		TopicFeed: 'Topic feed',
		OriginalWidth: 'Original width',
		OriginalHeight: 'Original height',
		MipmapLevels: 'Mipmap levels',
		MipmapLevel: 'Mipmap level',
		MipmapFilesize: 'Mipmap filesize',
	},
	Downloads: {
		Downloads: 'Загрузки',
		Name: 'Название',
		Size: 'Размер',
		Status: 'Статус',
		Progress: 'Выполнено',
		Complete: 'OK',
		Open: 'Открыть',
		Deleted: 'Удален',
		Delete: 'Удалить',
	},
	Feeds: {
		MyFeeds: 'Мои каналы',
		Feed: 'Канал',
	},
	Goto: {
		GotoItem: 'Перейти по адресу itemId',
		Goto: 'Вперед',
		ItemNotFound: 'Страница по адресу не найдена.',
	},
	Home: {
		Home: 'Главная',
	},
	Interactions: {
		Interactions: 'Упоминания',
	},
		ManageAccountActivate: {
		DeployAccount: 'Активация аккаунта',
		Info: 'Для старта Вам нужно иметь 0.01 MIX. Отправьте на кошелек это количество MIX или используйте кран для бесплатного старта.',
		Address: 'Адрес',
		Faucet: 'Бесплатный кран',
		FaucetRequest: 'Получить MIX',
		Balance: 'Баланс',
		PendingBalance: 'Неподтвержденный баланс',
		Deploying: 'Активация...',
	},
  ManageAccountDelete: {
		DeleteAccount: 'Delete Account',
		Warning: 'This will delete the account from this device. It can be recovered with its recovery phrase.',
    Delete: 'Delete',
    ControllerAddress: 'Controller Address',
    ContractAddress: 'Contract Address',
    Profile: 'Profile',
	},
	ManageAccounts: {
		Accounts: 'Аккаунты',
		Account: 'Аккаунт',
		Balance: 'Баланс',
		deploy: 'активировать',
    delete: 'delete',
		CreateAccount: 'Создать аккаунт',
		RecoverAccount: 'Восстановить аккаунт',
	},
	ManageAccountsNew: {
		CreateAccount: 'Создать аккаунт',
		Warning1: 'Все, что Вы опубликуете с помощью браузера ACUITY, навечно станет публичным достоянием.',
		Warning2: 'Это программное обеспечение все еще находится в стадии разработки. Не храните большое количество монет MIX в кошельке браузера.',
		Warning3: 'Гарантий нет.',
		Info1: 'Фраза восстановления - это единственный способ восстановить вашу учетную запись. Запишите её на бумаге и сохраните. Не рекомендуется сохранять в электронном виде.',
		Info2: 'Пароль предназначен для разблокировки учетной записи в браузере на этом компьютере. Он не используется для восстановления учетной записи.',
		RecoveryPhrase: 'Фраза восстановления',
    RepeatRecoveryPhrase: 'Repeat recovery phrase',
		Password: 'Пароль',
		RepeatPassword: 'Повторите пароль',
		Create: 'Создать',
    RepeatRecoveryPhraseIsRequired: 'Repeat recovery phrase is required.',
    RepeatRecoveryPhraseIsIncorrect: 'Repeat recovery phrase must match recovery phrase.',
		PasswordIsRequired: 'Укажите пароль.',
    RepeatPasswordIsRequired: 'Repeat password is required.',
		PasswordsDoNotMatch: 'Пароли не совпадают.',
	},
	ManageAccountsRecover: {
		RecoverAccount: 'Восстановление аккаунта',
		Warning1: 'Все, что Вы опубликуете с помощью браузера ACUITY, навечно станет публичным достоянием.',
		Warning2: 'Это программное обеспечение все еще находится в стадии разработки. Не храните большое количество монет MIX в кошельке браузера.',
		Warning3: 'Гарантий нет.',
		Info1: 'Введите фразу восстановления, сохраненную Вами ранее при создании аккаунта.',
		Info2: 'Пароль предназначен для разблокировки учетной записи в браузере на этом компьютере. Он не используется для восстановления учетной записи.',
		RecoveryPhrase: 'Фраза восстановления',
		Password: 'Пароль',
		RepeatPassword: 'Повторите пароль',
		Recover: 'Восстановить',
		RecoveryPhraseIsRequired: 'Укажите фразу восстановления.',
		PasswordIsRequired: 'Укажите пароль.',
    RepeatPasswordIsRequired: 'Repeat password is required.',
		PasswordsDoNotMatch: 'Пароли не совпадают.',
		AccountNotFound: 'Аккаунт не найден.',
	},
	MentionSelector: {
		Mentions: 'Отметить другой профиль',
		AddAMention: 'Добавить имя',
	},
	Mining: {
		Mining: 'Майнинг',
		Stop: 'Стоп',
		ApiMessage: 'Видеокарты AMD используют OpenCL, Nvidia используют CUDA.',
		Both: 'Оба типа',
		Pool: 'Пул',
		PoolMessage: 'Оставьте поле пустым для соло майнинга.',
		Start: 'Старт',
	},
	NodeStatus: {
		NodeStatus: 'Статус подключения',
		AcuityVersion: 'Версия Acuity',
		MixBlockchain: 'MIX Blockchain',
		Agent: 'Агент',
		Web3Version: 'Web3 версия',
		ProtocolVersion: 'Версия протокола',
		NetworkId: 'Network ID',
		BlockNumber: 'Номер блока',
		PeerCount: 'Количество узлов',
		Protocol: 'Протокол',
		Addresses: 'Адреса',
		RepoSize: 'Размер хранилища',
		RepoObjectCount: 'Количество объектов в хранилище',
	},
	Profile: {
		EditProfile: 'Редактировать профиль',
		AccountType: 'Тип аккаунта',
		Bio: 'О себе',
		Location: 'Местоположение',
		Anon: 'Анонимный',
		Person: 'Личный',
		Project: 'Рабочий',
		Organization: 'Корпоративный',
		Proxy: 'Посредник',
		Parody: 'Пародийный',
		Bot: 'Бот',
		Shill: 'Фиктивный',
		Test: 'Тестовый',
		ItemIdCopied: 'itemId скопирован',
	},
	ProfileEdit: {
		EditProfile: 'Редактировать профиль',
		Name: 'Имя',
		AccountType: 'Тип аккаунта',
		Anon: 'Анонимный',
		Person: 'Личный',
		Project: 'Рабочий',
		Organization: 'Корпоративный',
		Proxy: 'Посредник',
		Parody: 'Пародийный',
		Bot: 'Бот',
		Shill: 'Фиктивный',
		Test: 'Тестовый',
		Location: 'Местоположение',
		Bio: 'О себе',
		ChooseImage: 'Выбрать картинку',
		Publish: 'Опубликовать',
		Images: 'Изображение',
	},
	PublishFeed: {
		PublishFeed: 'Создать канал',
		Title: 'Название',
		Description: 'Описание',
		Image: 'Изображение',
		ChooseImage: 'Выбрать картинку',
		Publish: 'Опубликовать',
		Images: 'Изображение',
	},
	PublishFile: {
		PublishFile: 'Опубликовать файл',
		Title: 'Название',
		Description: 'Описание',
		Feed: 'Канал',
		SelectAFeed: 'Выберите канал',
		File: 'Файл',
		ChooseFile: 'Выберите файл',
		Publish: 'Опубликовать',
		UploadingFile: 'Загрузка файла...',
		Name: 'Name',
		Hash: 'Hash',
		Size: 'Size',
	},
	PublishImage: {
		PublishImage: 'Опубликовать статью',
		Title: 'Название',
		Description: 'Описание',
		Feed: 'Канал',
		SelectAFeed: 'Выберите канал',
		Image: 'Изображение',
		ChooseImage: 'Выберите картинку',
		Publish: 'Опубликовать',
		Images: 'Изображение',
	},
	PublishItem: {
		PublishItem: 'Опубликовать item',
		PublishImage: 'Опубликовать статью',
		PublishFeed: 'Создать канал',
		PublishFile: 'Опубликовать файл',
		PublishMixinType: 'Опубликовать Mixin Type',
	},
	PublishMixinType: {
		PublishMixinType: 'Опубликовать Mixin Type',
		Title: 'Название',
		Schema: 'Schema',
		Description: 'Описание',
		ParentItemId: 'Parent itemId',
		Publish: 'Опубликовать',
	},
	Settings: {
		Settings: 'Настройки',
		Language: 'Язык',
		Advanced: 'Прогрессивный',
		DevelopmentMode: 'Режим для разработчика',
	},
	Splash: {
		BlockchainSync: 'Blockchain synchronized',
		BlockchainState: 'Blockchain state accessible',
		IpfsGateway: 'IPFS gateway',
		PleaseWait: 'Пожалуйста подождите...',
		Block: 'Block',
	},
	Subscriptions: {
		Subscriptions: 'Подписки',
		Feed: 'Каналы',
		Remove: 'удалить',
		Topic: 'Темы (теги)',
	},
	Tokens: {
		Tokens: 'Токены',
		Token: 'Токен',
		Balance: 'Баланс',
		Remove: 'удалить',
		CreateToken: 'Создать токен',
	},
	TokenSelector: {
	  Token: 'Токен',
	},
	TopicSelector: {
		Topics: 'Темы (теги)',
		AddATopic: 'Добавить тему',
	},
	TransactionHistory: {
		TransactionHistory: 'История транзакций',
		When: 'Когда',
		Pending: 'pending',
		Description: 'Описание',
		Error: 'Error',
		Fee: 'Комиссия',
		Amount: 'Сумма',
	},
	TrustedAccounts: {
		TrustedAccounts: 'Аккаунты, которым доверяю',
		Account: 'Аккаунт',
		Remove: 'удалить',
		Whitelist: 'Белый список',
		Blacklist: 'Черный список',
	},
	ViewItem: {
		Subscribe: 'Пдписаться',
		Unsubscribe: 'Отписаться',
		Add: 'Добавить',
		Remove: 'Удалить',
		by: 'автор',
		Feeds: 'Каналы',
		Topics: 'Темы (теги)',
        Mentions: 'Отметить другой профиль',
		Size: 'Размер',
		Title: 'Название',
		Description: 'Описание',
		Publish: 'Опубликовать',
		Reply: 'Отправить комментарий',
		Close: 'Отмена',
		AuthorNotTrusted: 'Автору не доверяете.',
		Published: 'Опубликовано',
		JustNow: 'только что',
		ItemIdCopied: 'itemId скопирован',
	},
	ViewTopic: {
		Topic: 'Тема (тег)',
		Subscribe: 'Подписаться',
		Unsubscribe: 'Отписаться',
	},
	Wallet: {
		Wallet: 'Кошелек',
		Balance: 'Баланс',
		UnconfirmedBalance: 'Неподтвержденный баланс',
		Address: 'Адрес кошелька',
		Transactions: 'Транзакции',
		When: 'Когда',
		Amount: 'Количество',
		Send: 'Отправить',
		To: 'Кому (кошелек получателя)',
		SendAllMessage: 'Отправить все имеющиеся на счете средства.',
		SendAll: 'Отправить все',
		Confirm: 'Подтверждаю',
		Cancel: 'Отмена',
        InvalidAddress: 'Ошибка в адресе.',
		InvalidAmount: 'Ошибка в сумме.',
	},
	TokenView: {
		Address: 'Адрес кошелька',
		Symbol: 'Cимвольное обозначение',
		Name: 'Название',
		Start: 'Запуск',
		Owner: 'Владелец',
		InitialBalance: 'Начальный баланс',
		DailyPayout: 'Ежедневная выплата',
		TotalSupply: 'Общее предложение',
		YourBalance: 'Ваш баланс',
		Transactions: 'Транзакции',
		When: 'Когда',
		Pending: 'pending',
		Account: 'Аккаунт',
		Amount: 'Количество',
		Send: 'Отправить',
		To: 'Кому (кошелек получателя)',
		SendAllMessage: 'Отправить все имеющиеся на счете средства.',
		SendAll: 'Отправить все',
		Confirm: 'Подтверждаю',
		MixLiquidity: 'MIX ликвидность',
		TokenLiquidity: 'Токен ликвидность',
		MyLiquidity: 'Моя ликвидность',
		MixPerToken: 'MIX за токен',
		MaxTokens: 'Максимум токенов',
		AddLiquidity: 'Добавить ликвидность',
		Liquidity: 'Ликвидность',
		RemoveLiquidity: 'Удалить ликвидность',
		MixToTokens: 'MIX в токены',
		Tokens: 'Токены',
		TokensToMix: 'Токены в MIX',
		Holders: 'Держатели',
		NA: 'n/a',
		InvalidAddress: 'Ошибка в адресе.',
		InvalidAmount: 'Ошибка в сумме.',
	},
}
