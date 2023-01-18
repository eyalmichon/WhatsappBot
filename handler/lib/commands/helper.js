const { b, m, i } = require('../../util/style');

/**
 * The bot's global prefix.
 */
const prefix = '!';

/**
 * Creates the requested return type object easily.
 */
const returnType = {
    /**
     * Object information for sending a reply.
     * @param {String} text The text you want to send as a reply.
     * @returns Object information for sending a reply.
     */
    reply: (text) => { return { type: 'reply', info: text } },
    /**
     * Object information for sending a text.
     * @param {String} text The text you want to send.
     * @returns Object information for sending a text.
     */
    text: (text) => { return { type: 'text', info: text } },
    /**
     * Object information for sending a file from a URL.
     * @param {String} url the url from where to send the file from.
     * @param {String} fileName the file name that'll be set for the file.
     * @param {String} title the caption to add to the sent message.
     * @param {Object} options options for the fetch request.
     * @param {Boolean} ptt send the file as push to talk?
     * @returns Object information for sending a file from a URL.
     */
    fileFromURL: (url, fileName, title = '', options = null, ptt = false) => { return { type: 'fileFromURL', info: { url, fileName, title, options, ptt } } },
    /**
     * Object information for sending files from URLs.
     * @param {Array} urlsArray an array of URLs.
     * @returns Object information for sending files from URLs.
     */
    filesFromURL: (urlsArray) => { return { type: 'filesFromURL', info: urlsArray } },
    /**
     * Object information for sending a local file.
     * @param {String} path DataURL data:image/xxx;base64,xxx or the RELATIVE (should start with ./ or ../) path of the file you want to send.
     * @param {String} fileName the file name that'll be set for the file.
     * @param {String} title the caption to add to the sent message.
     * @param {Boolean} removeFile boolean if to remove a file after sending it.
     * @returns Object information for sending a local file. 
     */
    sendFile: (path, fileName, title = '', removeFile = true) => { return { type: 'sendFile', info: { path, fileName, title }, removeFile } },
    /**
     * Object information for sending local files.
     * @param {*} filePaths the paths of the files you want to send.
     * @param {*} fileNames the file names of the files you want to send.
     * @param {*} titles the captions of the files you want to send.
     * @param {*} removeFiles boolean if to remove the files after sending them.
     * @returns Object information for sending local files.
     */
    sendFiles: (filePaths, fileNames, titles = [], removeFiles = true) => { return { type: 'sendFiles', info: { filePaths, fileNames, titles }, removeFiles } },
    /**
     * Object information for sending a local music file as push to talk.
     * @param {String} path DataURL data:image/xxx;base64,xxx or the RELATIVE (should start with ./ or ../) path of the file you want to send.
     * @param {Boolean} removeFile boolean if to remove a file after sending it.
     * @returns Object information for sending a local music file.
     */
    sendPtt: (path, removeFile = true) => { return { type: 'sendPtt', info: { path }, removeFile } },
    /**
     * Object information for forwarding a message with its ID to a chat with a chatID.
     * @param {String} msgID the message ID being forwarded. 
     * @returns Object information for forwarding a message.
     */
    forwardMessage: (msgID) => { return { type: 'forwardMessage', info: { msgID } } },
    /**
     * Object information for sending a sticker from an image.
     * @param {String} base64 the image's base64.
     * @param {String} keepScale boolean for cropping or not, keepscale==true means no cropping.
     * @returns Object information for sending a sticker from an image.
     */
    imgSticker: (base64, keepScale = true) => { return { type: 'imgSticker', info: { base64, keepScale } } },
    /**
     * Object information for sending a sticker from a video.
     * @param {String} base64 the image's base64.
     * @param {String} crop boolean for cropping or not.
     * @returns Object information for sending a sticker from an video.
     */
    videoSticker: (base64, startTime = '00:00:00.0', endTime = '00:00:05.0', fps = 10, crop) => { return { type: 'videoSticker', info: { base64, crop, startTime, endTime, fps } } },
    /**
     * Object information for sending a sticker from a URL.
     * @param {String} url the image's/gif's link.
     * @param {String} keepScale boolean for cropping or not, keepscale==true means no cropping.
     * @returns Object information for sending a sticker from a URL.
     */
    urlSticker: (url, keepScale = true) => { return { type: 'urlSticker', info: { url, keepScale } } },
    /**
     * Object information for sending a text to the bot master.
     * @param {String} text the string of text.
     * @returns Object information for sending a text to the bot master.
     */
    sendMaster: (text) => { return { type: 'sendMaster', info: text } },
    /**
     * Object information for sending a poll.
     * @param {String} question the question of the poll.
     * @param {Array} options the options of the poll.
     */
    sendPoll: (question, options) => { return { type: 'sendPoll', info: { question, options } } },
}

const help = {
    Owner: {
        redAlerts: generateCommandString({
            cmdName: 'redalerts',
            cmdDescription: 'Sends Red Alerts 🚀 as message with (or without) location on GoogleMaps.',
            cmdUsage: {
                usage: `redalerts [on/off]`,
                options: [],
                aliases: ['redalerts']
            }
        }),
        addSender: generateCommandString({
            cmdName: 'addsender',
            cmdDescription: 'Add a number to the senders json file.',
            cmdUsage: {
                usage: `addsender [group] [ID]`,
                options: [],
                aliases: ['addsender']
            }
        }),
        removeSender: generateCommandString({
            cmdName: 'rmsender',
            cmdDescription: 'Remove a number from the senders json file.',
            cmdUsage: {
                usage: `rmsender [group] [ID]`,
                options: [],
                aliases: ['rmsender', 'rmvsender']
            }
        }),
        kickAll: generateCommandString({
            cmdName: 'kickall',
            cmdDescription: 'Kicks 🦶 all participants from the group.',
            cmdUsage: {
                usage: `kickall`,
                options: [],
                aliases: ['kickall']
            }
        }),
        membersOf: generateCommandString({
            cmdName: 'membersof',
            cmdDescription: 'Get a list of names from a specific group.',
            cmdUsage: {
                usage: `membersof [group ID]`,
                options: [],
                aliases: ['membersof']
            }
        }),
        ID: generateCommandString({
            cmdName: 'id',
            cmdDescription: 'Get a list of all group IDs that the bot is part of.',
            cmdUsage: {
                usage: `id`,
                options: [],
                aliases: ['id', 'jid']
            }
        }),
        tag: generateCommandString({
            cmdName: 'tag',
            cmdDescription: 'Mass spam tag people with any amount of mentions.',
            cmdUsage: {
                usage: `tag [number of tags] [@people]`,
                options: [],
                aliases: ['tag']
            }
        }),
        m: generateCommandString({
            cmdName: 'm',
            cmdDescription: 'Get the mimetype of the message.',
            cmdUsage: {
                usage: `m`,
                options: [],
                aliases: ['m']
            }
        }),
        addUserToBlackList: generateCommandString({
            cmdName: 'blacklist',
            cmdDescription: 'Blacklist a user from using the bot.',
            cmdUsage: {
                usage: `blacklist [tag] or reply to someone with the command.`,
                options: [],
                aliases: ['blacklist', 'black']
            }
        }),
        removeUserFromBlackList: generateCommandString({
            cmdName: 'unblacklist',
            cmdDescription: 'Unblacklist a user from using the bot.',
            cmdUsage: {
                usage: `unblacklist [tag] or reply to someone with the command.`,
                options: [],
                aliases: ['unblacklist', 'unblack']
            }
        }),
        addPrefixBlackList: generateCommandString({
            cmdName: 'addprefix',
            cmdDescription: 'Add a phone prefix to the prefix blacklist.',
            cmdUsage: {
                usage: `addprefix [country code] inside the group you want to prefix block or !addprefix [group ID] [country code] from bot private chat.`,
                options: [],
                aliases: ['addprefix']
            }
        }),
        removePrefixBlackList: generateCommandString({
            cmdName: 'rmprefix',
            cmdDescription: 'Remove a phone prefix from the prefix blacklist.',
            cmdUsage: {
                usage: `rmprefix [country code] inside the group you want to prefix block or !addprefix [group ID] [country code] from bot private chat.`,
                options: [],
                aliases: ['rmprefix']
            }
        }),
        addForwarder: generateCommandString({
            cmdName: 'addforwarder',
            cmdDescription: 'Create a group that will act as a forwarder.',
            cmdUsage: {
                usage: `addforwarder [lang] OR in the bot's chat: addforwader [groupID] [lang]  (where lang is a language that is in the localizations.json file)`,
                options: [],
                aliases: ['addforwarder']
            }
        }),
        removeForwarder: generateCommandString({
            cmdName: 'rmforwarder',
            cmdDescription: 'Remove a group from being a forwarder.',
            cmdUsage: {
                usage: `rmforwarder inside the forwarder OR in the bot's chat: rmforwader [groupID] (where groupID is the group you want to add to the forwarder)`,
                options: [],
                aliases: ['rmforwarder']
            }
        }),
        addGroupToForwarder: generateCommandString({
            cmdName: 'addgroupforwarder',
            cmdDescription: 'Add a group to a forwarder.',
            cmdUsage: {
                usage: `addgroupforwarder [groupID] inside the forwarder OR in the bot's chat: addgroupforwarder [forwarder groupID] [groupID] (where groupID is the group you want to add to the forwarder)`,
                options: [],
                aliases: ['addgroupforwarder', 'addgf']
            }
        }),
        removeGroupFromForwarder: generateCommandString({
            cmdName: 'rmgroupforwarder',
            cmdDescription: 'Remove a group from a forwarder.',
            cmdUsage: {
                usage: `rmgroupforwarder [groupID] inside the forwarder OR in the bot's chat: rmgroupforwarder [forwarder groupID] [groupID] (where groupID is the group you want to remove from the forwarder)`,
                options: [],
                aliases: ['rmgroupforwarder', 'rmgf']
            }
        }),
        setLanguageForwarder: generateCommandString({
            cmdName: 'setlanguageforwarder',
            cmdDescription: 'Set the language of a forwarder.',
            cmdUsage: {
                usage: `setlanguageforwarder [lang] inside the forwarder OR in the bot's chat: setlanguageforwarder [forwarder groupID] [lang] (where lang is a language that is in the localizations.json file)`,
                options: [],
                aliases: ['setlanguageforwarder', 'slf']
            }
        }),
        setMaxMsgsForwarder: generateCommandString({
            cmdName: 'setmaxmsgsforwarder',
            cmdDescription: 'Set the max amount of messages that will be saved in a forwarder.',
            cmdUsage: {
                usage: `setmaxmsgsforwarder [n] inside the forwarder OR in the bot's chat: setmaxmsgsforwarder [forwarder groupID] [n] (where n is a number that you want to set for the max amount of saved messages)`,
                options: [],
                aliases: ['setmaxmsgsforwarder', 'smmf']
            }
        }),
        setPrefixForwarder: generateCommandString({
            cmdName: 'setprefixforwarder',
            cmdDescription: 'Set the prefix of a forwarder.',
            cmdUsage: {
                usage: `setprefixforwarder [flag] inside the forwarder OR in the bot's chat: setprefixforwarder [forwarder groupID] [flag] (where flag is a flag that you want to set for the prefix)`,
                options: [
                    {
                        name: 'Prefix',
                        description: 'Prefix message ON/OFF',
                        usage: '-p/-prefix'
                    },
                    {
                        name: 'Name',
                        description: 'Name in message ON/OFF',
                        usage: '-n/-name'
                    }
                ],
                aliases: ['setprefixforwarder', 'spf']
            }
        }),
        removeMsg: generateCommandString({
            cmdName: 'remove',
            cmdDescription: 'Remove a message sent by the bot or anyone if the bot has admin.',
            cmdUsage: {
                usage: `remove`,
                options: [],
                aliases: ['remove', 'rmv']
            }
        }),
        countMessagesByText: generateCommandString({
            cmdName: 'countmsgs',
            cmdDescription: 'Counts the amount of messages sent in the group with the text you specified.',
            cmdUsage: {
                usage: `countmsgs [text]`,
                options: [
                    {
                        name: 'User',
                        description: 'Tag the users to search the messages for.',
                        usage: '-u/-user'
                    }
                ],
                aliases: ['countmsgs']
            }
        }),
        spamMessage: generateCommandString({
            cmdName: 'spam',
            cmdDescription: 'Spam the text or forward the message you specified in the group with the amount of times you specified.',
            cmdUsage: {
                usage: `spam [text]`,
                options: [
                    {
                        name: 'Amount',
                        description: 'Amount of times to spam the message.',
                        usage: '-n=number'
                    },
                    {
                        name: 'To',
                        description: 'ID of the group to send the message to.',
                        usage: '-to=groupID'
                    }
                ],
                aliases: ['spammsg']
            }
        }),
    },
    Admin: {
        everyone: generateCommandString({
            cmdName: 'everyone',
            cmdDescription: 'Tags everyone in the group.',
            cmdUsage: {
                usage: `everyone`,
                options: [],
                aliases: ['everyone', 'tagall']
            }
        }),
        kick: generateCommandString({
            cmdName: 'kick',
            cmdDescription: 'Kicks a participant from the group.',
            cmdUsage: {
                usage: `kick [@someone] or reply to a message sent by the user with the command.`,
                options: [],
                aliases: ['kick']
            }
        }),
        addParticipant: generateCommandString({
            cmdName: 'adduser',
            cmdDescription: 'Add a participant to the group.',
            cmdUsage: {
                usage: `adduser [number@c.us] or reply to a message that has the number@c.us with the command.`,
                options: [],
                aliases: ['adduser']
            }
        }),
        promote: generateCommandString({
            cmdName: 'promote',
            cmdDescription: 'Promotes 👨‍💼 a participant in the group.',
            cmdUsage: {
                usage: `promote [@someone] or reply to a message sent by the user with the command.`,
                options: [],
                aliases: ['promote']
            }
        }),
        demote: generateCommandString({
            cmdName: 'demote',
            cmdDescription: 'Demotes 👨‍💼 a participant in the group.',
            cmdUsage: {
                usage: `demote [@someone] or reply to a message sent by the user with the command.`,
                options: [],
                aliases: ['demote']
            }
        }),
        groupInviteLink: generateCommandString({
            cmdName: 'invitelink',
            cmdDescription: 'Gets the invite link of the group.',
            cmdUsage: {
                usage: `invitelink`,
                options: [],
                aliases: ['invitelink']
            }
        }),
        addUserToMuteList: generateCommandString({
            cmdName: 'mutelist',
            cmdDescription: 'Mutes a participant in the group.',
            cmdUsage: {
                usage: `mutelist [@someone] or reply to a message sent by the user with the command.`,
                options: [],
                aliases: ['mutelist', 'mute']
            }
        }),
        removeUserFromMuteList: generateCommandString({
            cmdName: 'unmutelist',
            cmdDescription: 'Unmutes a participant in the group.',
            cmdUsage: {
                usage: `unmutelist [@someone] or reply to a message sent by the user with the command.`,
                options: [],
                aliases: ['unmutelist', 'unmute']
            }
        }),
        getProfilePic: generateCommandString({
            cmdName: 'profilepic',
            cmdDescription: 'Gets the profile picture of the user.',
            cmdUsage: {
                usage: `profilepic or reply to a message with profilepic`,
                options: [],
                aliases: ['profilepic']
            }
        }),
    },
    Social: {
        meme: generateCommandString({
            cmdName: 'meme',
            cmdDescription: 'Gets a random meme from the subreddits you specified.',
            cmdUsage: {
                usage: `meme and you\'ll get random meme from the following subreddits:\n SUBS_LIST.\n\nOr ${prefix}meme [subreddit] to get a random image from that subreddit.`,
                options: [],
                aliases: ['meme']
            }
        }),
        reddit: generateCommandString({
            cmdName: 'reddit',
            cmdDescription: 'Gets a random post from the subreddits you specified.',
            cmdUsage: {
                usage: `reddit and you\'ll get random post from the following subreddits:\n SUBS_LIST.\n\nOr ${prefix}reddit [subreddit] to get a random post from that subreddit.`,
                options: [],
                aliases: ['reddit', 'rd']
            }
        }),
        instagram: generateCommandString({
            cmdName: 'instagram',
            cmdDescription: 'Gets the photo/video/story from the instagram link you specified.',
            cmdUsage: {
                usage: `instagram or reply to a instagram photo/video/story link with instagram.`,
                options: [],
                aliases: ['instagram', 'insta', 'ig']
            }
        }),
        twitter: generateCommandString({
            cmdName: 'twitter',
            cmdDescription: 'Gets the video from the twitter link you specified.',
            cmdUsage: {
                usage: `twitter or reply to a twitter video link with with the command.`,
                options: [],
                aliases: ['twitter', 'tw']
            }
        }),
        tiktok: generateCommandString({
            cmdName: 'tiktok',
            cmdDescription: 'Gets the video from the tiktok link you specified.',
            cmdUsage: {
                usage: `tiktok or reply to a tiktok video link with the command.`,
                options: [],
                aliases: ['tiktok', 'tik', 'tk']
            }
        }),
        facebook: generateCommandString({
            cmdName: 'facebook',
            cmdDescription: 'Gets the video from the facebook link you specified.',
            cmdUsage: {
                usage: `facebook or reply to a facebook video link with the command.`,
                options: [],
                aliases: ['facebook', 'fb']
            }
        }),
        youtube: generateCommandString({
            cmdName: 'youtube',
            cmdDescription: 'Gets the video from the youtube link you specified.',
            cmdUsage: {
                usage: `youtube or reply to a youtube video link with the command.`,
                options: [
                    {
                        name: 'Audio only',
                        description: 'Gets the audio only from the youtube video.',
                        usage: '-a'
                    }
                ],
                aliases: ['youtube', 'yt']
            }
        }),
        video: generateCommandString({
            cmdName: 'video',
            cmdDescription: 'Gets the video from the link you specified.',
            cmdUsage: {
                usage: `video or reply to a video link with the command.`,
                options: [],
                aliases: ['video', 'v']
            }
        }),
        downloadSongs: generateCommandString({
            cmdName: 'songs',
            cmdDescription: 'Downloads the songs with the specified names.',
            cmdUsage: {
                usage: `songs [song names] (for longer song names use quotes, for example: "paradise city")`,
                options: [
                    {
                        name: 'flac',
                        description: 'Downloads the songs in flac format.',
                        usage: '-flac'
                    },
                    {
                        name: '320kbps',
                        description: 'Downloads the songs in 320kbps format.',
                        usage: '-320/-mp3'
                    },
                    {
                        name: '128kbps',
                        description: 'Downloads the songs in 128kbps format.',
                        usage: '-128'
                    }
                ],
                aliases: ['songs']
            }
        }),
    },
    Forwarder: {
        egg: generateCommandString({
            cmdName: 'egg',
            cmdDescription: 'Gets an egg.',
            cmdUsage: {
                usage: `egg and you\'ll get an 🥚\nHAPPY EGGING!`,
                options: [],
                aliases: ['egg']
            }
        }),
        fart: generateCommandString({
            cmdName: 'fart',
            cmdDescription: 'Gets a fart.',
            cmdUsage: {
                usage: `fart and you\'ll get a 💨\nCan you smell it?!\nAt least try to!`,
                options: [],
                aliases: ['fart']
            }
        })
    },
    Info: {
        compile: generateCommandString({
            cmdName: 'compile',
            cmdDescription: 'Compile and run code in many different languages.',
            cmdUsage: {
                usage: `compile [language] [code]`,
                options: [
                    {
                        name: 'Available Languages',
                        description: 'The available languages are: c, cpp, c#, rill, erlang, elixir, haskell, d, java, rust, python, python2.7, ruby, scala, groovy, nodejs, nodejs14, coffeescript, spidermonkey, swift, perl, php, lua, sql, pascal, lisp, lazyk, vim, pypy, ocaml, go, bash, pony, crystal, nim, openssl, f#, r, typescript, julia',
                    }
                ],
                aliases: ['compile']
            }
        }),
        covid: generateCommandString({
            cmdName: 'covid',
            cmdDescription: 'Gets information about the covid-19 virus.',
            cmdUsage: {
                usage: `covid (or covid [1-7] for number of days to get info about) to get back information about active cases, infected people today, etc...`,
                options: [],
                aliases: ['covid']
            }
        }),
        wolfram: generateCommandString({
            cmdName: 'wolfram',
            cmdDescription: 'Gets an answer from Wolfram Alpha.',
            cmdUsage: {
                usage: `wolfram [question] and you'll receive an answer from Wolfram Alpha.`,
                options: [
                    {
                        name: 'Full answer',
                        description: 'Gets the full answer from Wolfram Alpha.',
                        usage: '-f'
                    }
                ],
                aliases: ['wolframalpha', 'wolfram', 'wolf', 'wf']
            }
        }),
        urban: generateCommandString({
            cmdName: 'urban',
            cmdDescription: 'Gets the top definition for the term you specified from Urban Dictionary.',
            cmdUsage: {
                usage: 'urban [term] and you\'ll receive the top definition for that term from Urban Dictionary.',
                options: [
                    {
                        name: 'Word of the day',
                        description: 'Gets the word of the day from Urban Dictionary.',
                        usage: '[how many days ago? 0-9] -wotd'
                    },
                    {
                        name: 'Random',
                        description: 'Gets a random word from Urban Dictionary.',
                        usage: '-r'
                    }
                ],
                aliases: ['urban', 'ud']
            }
        }),
        translate: generateCommandString({
            cmdName: 'translate',
            cmdDescription: 'Translate text from one language to another.',
            cmdUsage: {
                usage: 'translate [text] and you\'ll receive the translation for the text from Google Translate.',
                options: [
                    {
                        name: 'Translate to',
                        description: 'Translate to a specific language.',
                        usage: '-l=[code] or -lang=[code]',
                        moreOptions: [
                            {
                                name: 'Language codes',
                                description: 'Afrikaans = *af*, Albanian = *sq*, Amharic = *am*, Arabic = *ar*, Armenian = *hy*, Azerbaijani = *az*, Basque = *eu*, Belarusian = *be*, Bengali = *bn*, Bosnian = *bs*, Bulgarian = *bg*, Catalan = *ca*, Cebuano = *ceb*, Chinese (Simplified) = *zh-CN*, Chinese (Traditional) = *zh-TW*, Corsican = *co*, Croatian = *hr*, Czech = *cs*, Danish = *da*, Dutch = *nl*, English = *en*, Esperanto = *eo*, Estonian = *et*, Finnish = *fi*, French = *fr*, Frisian = *fy*, Galician = *gl*, Georgian = *ka*, German = *de*, Greek = *el*, Gujarati = *gu*, Haitian Creole = *ht*, Hausa = *ha*, Hawaiian = *haw*, Hebrew = *iw*, Hindi = *hi*, Hmong = *hmn*, Hungarian = *hu*, Icelandic = *is*, Igbo = *ig*, Indonesian = *id*, Irish = *ga*, Italian = *it*, Japanese = *ja*, Kannada = *kn*, Kazakh = *kk*, Khmer = *km*, Korean = *ko*, Kurdish = *ku*, Kyrgyz = *ky*, Lao = *lo*, Latvian = *lv*, Lithuanian = *lt*, Luxembourgish = *lb*, Macedonian = *mk*, Malagasy = *mg*, Malay = *ms*, Malayalam = *ml*, Maltese = *mt*, Maori = *mi*, Marathi = *mr*, Mongolian = *mn*, Myanmar (Burmese) = *my*, Nepali = *ne*, Norwegian = *no*, Nyanja (Chichewa) = *ny*, Pashto = *ps*, Persian = *fa*, Polish = *pl*, Portuguese (Portugal, Brazil) = *pt*, Punjabi = *pa*, Romanian = *ro*, Russian = *ru*, Samoan = *sm*, Scots Gaelic = *gd*, Serbian = *sr*, Sesotho = *st*, Shona = *sn*, Sindhi = *sd*, Sinhala (Sinhalese) = *si*, Slovak = *sk*, Slovenian = *sl*, Somali = *so*, Spanish = *es*, Sundanese = *su*, Swahili = *sw*, Swedish = *sv*, Tagalog (Filipino) = *tl*, Tajik = *tg*, Tamil = *ta*, Telugu = *te*, Thai = *th*, Turkish = *tr*, Ukrainian = *uk*, Urdu = *ur*, Uzbek = *uz*, Vietnamese = *vi*, Welsh = *cy*, Xhosa = *xh*, Yiddish = *yi*, Yoruba = *yo*, Zulu = *zu*',
                            }
                        ]
                    }
                ],
                default: 'defaults to english if no option used',
                aliases: ['translate', 'tran', 'tr']
            }
        }),
        recognizeMusic: generateCommandString({
            cmdName: 'recognizeMusic',
            cmdDescription: 'Recognize a song from an audio message or a video.',
            cmdUsage: {
                usage: 'reply with the command to an audio message or a video.',
                options: [
                    {
                        name: 'All results',
                        description: 'Get all the results from the API.',
                        usage: '-f or -full'
                    }
                ],
                aliases: ['recognize', 'rec', 'rm']
            }
        }),
        nikud: generateCommandString({
            cmdName: 'nikud',
            cmdDescription: 'Add nikud to a text.',
            cmdUsage: {
                usage: 'nikud [text] or reply with the command to a text message.',
                options: [],
                aliases: ['nikud', 'nik', 'נקד']
            },
        }),
        grammar: generateCommandString({
            cmdName: 'grammar',
            cmdDescription: 'Fix grammar in a text.',
            cmdUsage: {
                usage: 'grammar [text] or reply with the command to a text message.',
                options: [
                    {
                        name: 'language',
                        description: 'The language of the text.',
                        usage: '-l=[code] or -lang=[code]',
                        moreOptions: [
                            {
                                name: 'Language codes',
                                description: 'French = *fra*, English = *eng*'
                            }
                        ]
                    }
                ],
                aliases: ['grammar', 'gram']
            },
        }),
        tts: generateCommandString({
            cmdName: 'tts',
            cmdDescription: 'Text to speech.',
            cmdUsage: {
                usage: 'tts [text] or reply with the command to a text message.',
                options: [
                    {
                        name: 'language',
                        description: 'The language of the text.',
                        usage: '-l=[code] or -lang=[code]',
                        moreOptions: [
                            {
                                name: 'Language codes',
                                description: 'Arabic = *ara*, German = *ger*, Spanish = *spa*, French = *fra*, Hebrew = *heb*, Italian = *ita*, Japanese = *jpn*, Dutch = *dut*, Polish = *pol*, Portuguese = *por*, Romanian = *rum*, Russian = *rus*, Turkish = *tur*, Chinese = *chi*, English = *eng*'
                            }
                        ]
                    }
                ],
                aliases: ['tts']
            },
        }),
        context: generateCommandString({
            cmdName: 'context',
            cmdDescription: 'Translate with context.',
            cmdUsage: {
                usage: 'context [text] or reply with the command to a text message.',
                options: [
                    {
                        name: 'From language',
                        description: 'The language of the text.',
                        usage: '-fl=[code] or -froml=[code] or -fromlang=[code]',
                    },
                    {
                        name: 'To language',
                        description: 'The language to translate to.',
                        usage: '-tl=[code] or -tol=[code] or -tolang=[code]',
                        moreOptions: [
                            {
                                name: 'Language codes',
                                description: 'Arabic = *ara*, German = *ger*, Spanish = *spa*, French = *fra*, Hebrew = *heb*, Italian = *ita*, Japanese = *jpn*, Dutch = *dut*, Polish = *pol*, Portuguese = *por*, Romanian = *rum*, Russian = *rus*, Turkish = *tur*, Chinese = *chi*, English = *eng*'
                            }
                        ]
                    }
                ],
                aliases: ['context', 'cont']
            },
        }),
        synonym: generateCommandString({
            cmdName: 'synonym',
            cmdDescription: 'Get synonyms and antonyms for a text.',
            cmdUsage: {
                usage: 'synonym [text] or reply with the command to a text message.',
                options: [
                    {
                        name: 'Language',
                        description: 'The language of the text.',
                        usage: '-l=[code] or -lang=[code]',
                        moreOptions: [
                            {
                                name: 'Language codes',
                                description: 'Arabic = *ara*, German = *ger*, Spanish = *spa*, French = *fra*, Hebrew = *heb*, Italian = *ita*, Japanese = *jpn*, Dutch = *dut*, Polish = *pol*, Portuguese = *por*, Romanian = *rum*, Russian = *rus*, Turkish = *tur*, Chinese = *chi*, English = *eng*'
                            }
                        ]
                    }
                ],
                aliases: ['synonym', 'syno']
            },
        }),
        conjugate: generateCommandString({
            cmdName: 'conjugate',
            cmdDescription: 'Get conjugation information for a text.',
            cmdUsage: {
                usage: 'conjugate [text] or reply with the command to a text message.',
                options: [
                    {
                        name: 'Language',
                        description: 'The language of the text.',
                        usage: '-l=[code] or -lang=[code]',
                        moreOptions: [
                            {
                                name: 'Language codes',
                                description: 'Arabic = *ara*, German = *ger*, Spanish = *spa*, French = *fra*, Hebrew = *heb*, Italian = *ita*, Japanese = *jpn*, Dutch = *dut*, Polish = *pol*, Portuguese = *por*, Romanian = *rum*, Russian = *rus*, Turkish = *tur*, Chinese = *chi*, English = *eng*'
                            }
                        ]
                    }
                ],
                aliases: ['conjugate', 'conj']
            },
        }),
        thisDoesntExist: generateCommandString({
            cmdName: "thisdoesntexist",
            cmdDescription: "Generate a thisdoesntexist type of item.",
            cmdUsage: {
                usage: "thisdoesntexist [-flag] (where -flag is one of the flags below) or else a random one will be chosen.",
                options: [
                    {
                        name: "Flags",
                        description: "",
                        usage: "-flag=[flag]",
                        default: "random",
                        moreOptions: [
                            {
                                name: "Person",
                                description: "Generate a person that doesn't exist.",
                                usage: "-person"
                            },
                            {
                                name: "Cat",
                                description: "Generate a cat that doesn't exist.",
                                usage: "-cat"
                            },
                            {
                                name: "Horse",
                                description: "Generate a horse that doesn't exist.",
                                usage: "-horse"
                            },
                            {
                                name: "Rental",
                                description: "Generate a rental that doesn't exist.",
                                usage: "-rental"
                            },
                            {
                                name: "Waifu",
                                description: "Generate a waifu that doesn't exist.",
                                usage: "-waifu"
                            },
                            {
                                name: "Question",
                                description: "Generate a question that doesn't exist.",
                                usage: "-question"
                            },
                            {
                                name: "Chemical",
                                description: "Generate a chemical that doesn't exist.",
                                usage: "-chemical"
                            },
                            {
                                name: "Word",
                                description: "Generate a word that doesn't exist.",
                                usage: "-word"
                            },
                            {
                                name: "City",
                                description: "Generate a city that doesn't exist.",
                                usage: "-city"
                            },
                            {
                                name: "Simpsons",
                                description: "Generate a simpsons character that doesn't exist.",
                                usage: "-simpsons"
                            },
                            {
                                name: "Art",
                                description: "Generate a piece of art that doesn't exist.",
                                usage: "-art"
                            },
                            {
                                name: "Video",
                                description: "Generate a video that doesn't exist. (could take some time)",
                                usage: "-video"
                            },
                            {
                                name: "Ideas",
                                description: "Generate an idea that doesn't exist.",
                                usage: "-ideas"
                            },
                            {
                                name: "Lyrics",
                                description: "Generate lyrics that don't exist.",
                                usage: "-lyrics",
                                moreOptions: [
                                    {
                                        name: "Topic",
                                        description: "The topic of the lyrics.",
                                        usage: "-t/topic=[topic]"
                                    },
                                    {
                                        name: "Genre",
                                        description: "The genre of the lyrics. (country, metal, rock, pop, rap, edm)",
                                        usage: "-g/genre=[genre]"

                                    },
                                    {
                                        name: "Mood",
                                        description: "The mood of the lyrics. (verysad, sad, neutral, happy, veryhappy)",
                                        usage: "-m/mood=[mood]"
                                    }
                                ]
                            }
                        ]
                    }
                ],
                aliases: ['thisdoesntexist', 'tde']
            }
        }),
        emojiGenerator: generateCommandString({
            cmdName: "emojigenerator",
            cmdDescription: "Generate a random emoji.",
            cmdUsage: {
                usage: "emojigenerator [number] (where number is an integer between 1-999)",
                options: [],
                aliases: ["emojigenerator", "randemoji"]
            },
        }),
        qr: generateCommandString({
            cmdName: "qr",
            cmdDescription: "Generate a QR code.",
            cmdUsage: {
                usage: "qr [data] (where data is the content or content seperated with \"|\" if needed for some of the options below.)",
                options: [
                    {
                        name: "Types",
                        description: "",
                        usage: "-type=[type]",
                        default: "text",
                        moreOptions: [
                            {
                                name: "Text",
                                description: "Create a qr code from text/website/etc.",
                                usage: "-type=text and enter a text/website/etc.",
                                default: "text"
                            },
                            {
                                name: "Email",
                                description: "Create a qr code for an email.",
                                usage: "-type=email \"email|subject|message body\"",
                                default: "email"
                            },
                            {
                                name: "Phone",
                                description: "Create a qr code for a phone number.",
                                usage: "-type=phone and enter a phone number",
                            },
                            {
                                name: "SMS",
                                description: "Create a qr code for an SMS.",
                                usage: "-type=sms \"phone number|message\"",
                            },
                            {
                                name: "Contact",
                                description: "Create a qr code for a contact.",
                                usage: "-type=contact \"first name|last name|work position|organization|Website|Email|Work phone|Home phone|Mobile phone|Fax work|Fax home|Street|City|State|Zipcode|Country\"",
                            },
                            {
                                name: "WiFi",
                                description: "Create a qr code for a WiFi.",
                                usage: "-type=wifi \"wifi name|WEP or WPA|Password\"",
                            },
                            {
                                name: "Event",
                                description: "Create a qr code for an event.",
                                usage: "-type=event \"Event title|Location|Start date|Start time|End date|End time\"\n Date example: YYYY.MM.DD\nTime example: HH:MM",
                            },
                            {
                                name: "Crypto",
                                description: "Create a qr code for a crypto address.",
                                usage: "-type=crypto \"Address|Amount\"\nChoose the coin using -coin=[type] (where type is one of the following: [bitcoin, bitcoincash, ethereum, litecoin, dash])",
                            },
                            {
                                name: "WhatsApp",
                                description: "Create a qr code for a WhatsApp message.",
                                usage: "-type=wa \"phone number|message\"",
                            },
                            {
                                name: "File",
                                description: "Choose one of the following: [png, svg, pdf, eps]",
                                usage: "-type=[type]",
                            },
                            {
                                name: "Size",
                                description: "Choose the size of the qr code image.",
                                usage: "-size=[300-2000]",
                            },
                            {
                                name: "Body",
                                description: "Choose one of the following: [square, mosaic, dot, circle, circle-zebra, circle-zebra-vertical, circular, edge-cut, edge-cut-smooth, japnese, leaf, pointed, pointed-edge-cut, pointed-in, pointed-in-smooth,pointed-smooth, round,  rounded-in, rounded-in-smooth, rounded-pointed, star, diamond]",
                                usage: "-body=[type]",
                            },
                            {
                                name: "Eye",
                                description: "Choose the eye type.",
                                usage: "-eye=[0-16]",
                            },
                            {
                                name: "Eyeball",
                                description: "Choose the eyeball type.",
                                usage: "-eyeball=[0-19]",
                            },
                            {
                                name: "Body Color",
                                description: "Choose the body color.",
                                usage: "-bodycolor=[color in hex]",
                            },
                            {
                                name: "Background Color",
                                description: "Choose the background color.",
                                usage: "-bgcolor=[color in hex]",
                            },

                            {
                                name: "Eye 1-3 Color",
                                description: "Choose the eye color.",
                                usage: "-eye[1-3]color=[color in hex] or all together -eyescolor=[color in hex]",
                            },
                            {
                                name: "Eyeball 1-3 Color",
                                description: "Choose the eyeball color.",
                                usage: "-eyeball[1-3]color=[color in hex] or all together -eyeballscolor=[color in hex]",
                            },
                            {
                                name: "Gradient",
                                description: "Choose the gradient color.",
                                usage: "-gradientcolor1=[color in hex] -gradientcolor2=[color in hex]",
                            },
                            {
                                name: "Gradient type",
                                description: "Choose the gradient type.",
                                usage: "-gradienttype=[linear, radial]",
                            },
                            {
                                name: "Gradient on eyes",
                                description: "Choose if the gradient is on the eyes.",
                                usage: "-gradientoneyes=true",
                            },
                        ],
                    },
                ],
                aliases: ["qr"],
            }
        }),
        carInfo: generateCommandString({
            cmdName: "carinfo",
            cmdDescription: "Get information about a car or a motorbike.",
            cmdUsage: {
                usage: "carinfo [number] (where number is the car's number of length between 7-8)",
                options: [],
                aliases: ["carinfo"]
            }
        }),
        currency: generateCommandString({
            cmdName: "currency",
            cmdDescription: "Convert currencies.",
            cmdUsage: {
                usage: "currency [amount (default is 1)] -to=[id] -from=[id]",
                options: [{ name: "IDs", description: "", usage: "", default: "", moreOptions: [] }],
                aliases: ["currency"]
            }
        }),
        imagine: generateCommandString({
            cmdName: "imagine",
            cmdDescription: "Turn text into images.",
            cmdUsage: {
                usage: "imagine [text] (where text is the text you want to come to life.)",
                options: [
                    {
                        name: "Enhance", description: "Whether to enhance the image or not.", usage: "-enhance or -hd", default: "False", moreOptions: []
                    },
                    {
                        name: "Model Version", description: "The model to be used.", usage: "-v=[1.5/2.1]", default: "2.1", moreOptions: []
                    },
                    {
                        name: "Quality", description: "Quality refers to the number of artistic steps taken while creating. The more steps, the higher the quality.", usage: "-quality=[25-150]", default: "25", moreOptions: []
                    },
                    {
                        name: "Freedom",
                        description: "The level of freedom (or strictness) you allow when creating from your prompt. Higher values force to follow your prompt.",
                        default: "7.5",
                        usage: "-freedom=[0-30](float)",
                        moreOptions: []
                    },
                    {
                        name: "Ratio",
                        description: "The aspect ratio of the image.",
                        default: "3 (square)",
                        usage: "-ratio=[1-5]",
                        moreOptions: [
                            { name: "1", description: "Cinema 16:9" },
                            { name: "2", description: "Landscape 3:2" },
                            { name: "3", description: "Square 1:1" },
                            { name: "4", description: "Tablet 2:3" },
                            { name: "5", description: "Phone 9:16" }
                        ]
                    },
                    {
                        name: "Image",
                        description: "The image to start the creation from.",
                        default: "",
                        usage: "-image and tag an image or -image and a link of an image",
                        moreOptions: [
                            {
                                name: "Strength",
                                description: "The strength of the image. (To use with an image)",
                                default: "",
                                usage: "-strength=[0-1]",
                                moreOptions: []
                            },
                        ]
                    },
                    {
                        name: "Negative Prompt",
                        description: "A description of what you do *not* want in the image - will stay away from concepts in the negative prompt.",
                        default: "",
                        usage: "-neg='prompt here'",
                        moreOptions: []
                    }
                ],
                aliases: ["imagine"]
            }
        }),
        enhanceImage: generateCommandString({
            cmdName: "enhanceimage",
            cmdDescription: "Enhance an image.",
            cmdUsage: {
                usage: "enhance with an image or reply to an image with the command.",
                options: [],
                aliases: ["enhance"]
            }
        }),
        poll: generateCommandString({
            cmdName: "poll",
            cmdDescription: "Create a poll.",
            cmdUsage: {
                usage: "poll [question, option1, options2, etc...]",
                options: [],
                aliases: ["poll"]
            }
        }),
    },
    Sticker: {
        sticker: generateCommandString({
            cmdName: "sticker",
            cmdDescription: "Create a sticker.",
            cmdUsage: {
                usage: "sticker [image/gif/video] (reply to an image/gif/video or send an image/gif/video with the command) or sticker [url] (reply to a url of an image/gif/video or send a url with the command)",
                options: [
                    {
                        name: "Image Options",
                        description: "",
                        moreOptions: [
                            {
                                name: "Cropping",
                                description: "Crop the image to a square.",
                                usage: "-c",
                                default: "False",
                                moreOptions: []
                            },
                            {
                                name: "Remove Background",
                                description: "Remove the background of the image.",
                                usage: "-r",
                                default: "False",
                                moreOptions: []
                            },
                            {
                                name: "Background",
                                description: "The background of the sticker. (send an image (which you want it\'s background removed), then quote the image with the background picture you want)",
                                usage: "-bg",
                                default: "none",
                                moreOptions: []
                            },
                            {
                                name: "Background from URL",
                                description: "The background of the sticker from a URL.",
                                usage: "-url=[image link]",
                                default: "none",
                                moreOptions: []
                            },
                            {
                                name: "Image stroke",
                                description: "Add a stroke to the image.",
                                usage: "-s",
                                default: "False",
                                moreOptions: []
                            },
                            {
                                name: "Image stroke size",
                                description: "The size of the stroke.",
                                usage: "-size=[1-10]",
                                default: "1",
                                moreOptions: []
                            },
                            {
                                name: "Image stroke alpha",
                                description: "The alpha of the stroke.",
                                usage: "-alpha=[0-255]",
                                default: "255",
                                moreOptions: []
                            },
                            {
                                name: "Image stroke color",
                                description: "The color of the stroke.",
                                usage: "-color=[color name or #hex]",
                                default: "white",
                                moreOptions: []
                            },
                        ]
                    },
                    {
                        name: "Text Options",
                        description: "The text to add to the sticker.",
                        usage: "-t [and type text you want, seperate text to top and bottom using \"|\" character]",
                        moreOptions: [
                            {
                                name: "Text fill color",
                                description: "The color of the text.",
                                usage: "-fcolor=[color name or #hex]",
                                default: "white",
                                moreOptions: []
                            },
                            {
                                name: "Text stroke color",
                                description: "The color of the stroke.",
                                usage: "-scolor=[color name or #hex]",
                                default: "black",
                                moreOptions: []
                            },
                            {
                                name: "Text font size",
                                description: "The size of the font.",
                                usage: "-fsize=[1-1000]",
                                default: "50",
                                moreOptions: []
                            },
                            {
                                name: "Text stroke size",
                                description: "The size of the stroke.",
                                usage: "-ssize=[1-100]",
                                default: "1",
                                moreOptions: []
                            },
                            {
                                name: "Max text rows",
                                description: "The max rows of text.",
                                usage: "-rows=[1-6]",
                                default: "2",
                                moreOptions: []
                            },
                        ]
                    },
                    {
                        name: "Whatsapp message",
                        description: "Send the sticker as a Whatsapp message.",
                        usage: "",
                        default: "False",
                        moreOptions: [
                            {
                                name: "Whatsapp message",
                                description: "Send the sticker as a Whatsapp message.",
                                usage: "-m",
                                default: "False",
                                moreOptions: []
                            },
                            {
                                name: "Reply",
                                description: "Reply to a message.",
                                usage: "-rep",
                                default: "False",
                                moreOptions: [
                                    {
                                        name: "Reply Phone number",
                                        description: "The phone number of the person you want to reply to.",
                                        usage: "-p=[name/phone]",
                                        default: "Taken from the original message",
                                        moreOptions: []
                                    },
                                    {
                                        name: "Reply Name",
                                        description: "The name of the person you want to reply to.",
                                        usage: "-n=[name]",
                                        default: "Taken from the original message",
                                        moreOptions: []
                                    },
                                    {
                                        name: "Replied Phone number",
                                        description: "The phone number of the person that replied to you.",
                                        usage: "-rp=[name/phone]",
                                        default: "Taken from the original message",
                                        moreOptions: []
                                    },
                                    {
                                        name: "Replied Name",
                                        description: "The name of the person that replied to you.",
                                        usage: "-rn=[name]",
                                        default: "Taken from the original message",
                                        moreOptions: []
                                    },
                                ]
                            },
                            {
                                name: "Time on voice message",
                                description: "The time on the voice message.",
                                usage: "-time=[HH:MM:SS]",
                                default: "Current time",
                                moreOptions: []
                            }
                        ]
                    },
                ],
                aliases: ['sticker', 's']
            }
        }),
        textSticker: generateCommandString({
            cmdName: 'textSticker',
            cmdDescription: 'Create a sticker from text.',
            cmdUsage: {
                usage: `textsticker [text] or reply with textsticker to a message.`,
                options: [
                    {
                        name: "Background color",
                        description: "The background color of the sticker.",
                        usage: "-bgcolor=[color name or #hex]",
                        default: "Transparent",
                        moreOptions: []
                    },
                    {
                        name: "Stroke",
                        description: "Add a stroke to the image.",
                        usage: "-s",
                        default: "False",
                        moreOptions: [
                            {
                                name: "Stroke color",
                                description: "The color of the stroke.",
                                usage: "-scolor=[color name or #hex]",
                                default: "black",
                                moreOptions: []
                            },
                            {
                                name: "Stroke size",
                                description: "The size of the stroke.",
                                usage: "-ssize=[1-100]",
                                default: "1",
                                moreOptions: []
                            },
                            {
                                name: "Fill color",
                                description: "The color of the text.",
                                usage: "-fcolor=[color name or #hex]",
                                default: "white",
                                moreOptions: []
                            },
                            {
                                name: "Font size",
                                description: "The size of the font.",
                                usage: "-fsize=[1-1000]",
                                default: "50",
                                moreOptions: []
                            },
                            {
                                name: "Max text rows",
                                description: "The max rows of text.",
                                usage: "-rows=[1-15]",
                                default: "2",
                                moreOptions: []
                            },
                        ]
                    },
                ],
                aliases: ['textsticker', 'ts']
            }
        }),
    },
    Media: {
        removebg: generateCommandString({
            cmdName: 'removebg',
            cmdDescription: 'Remove the background of an image.',
            cmdUsage: {
                usage: `removebg or reply with removebg to an image/sticker or send the image with caption removebg to receive a file without the image background.`,
                options: [
                    {
                        name: "Background",
                        description: "The background of the image. (send an image (which you want it\'s background removed), then quote the image with the background picture you want)",
                        usage: "-bg",
                        default: "False",
                        moreOptions: [
                            {
                                name: "Background from url",
                                description: "The background of the image from a url.",
                                usage: "-url=[image link]",
                                default: "False",
                                moreOptions: []
                            },
                        ]
                    },
                    {
                        name: "Stroke",
                        description: "Add a stroke to the image.",
                        usage: "-s",
                        default: "False",
                        moreOptions: [
                            {
                                name: "Stroke size",
                                description: "The size of the stroke.",
                                usage: "-size=[1-10]",
                                default: "1",
                                moreOptions: []
                            },
                            {
                                name: "Stroke color",
                                description: "The color of the stroke.",
                                usage: "-color=[color name or #hex]",
                                default: "black",
                                moreOptions: []
                            },
                            {
                                name: "Stroke alpha",
                                description: "The alpha of the stroke.",
                                usage: "-alpha=[0-255]",
                                default: "255",
                                moreOptions: []
                            },
                        ]
                    },
                    {
                        name: "Text",
                        description: "Add text to the image.",
                        usage: "-t",
                        default: "False",
                        moreOptions: [
                            {
                                name: "Stroke color",
                                description: "The color of the stroke.",
                                usage: "-scolor=[color name or #hex]",
                                default: "white",
                                moreOptions: []
                            },
                            {
                                name: "Fill color",
                                description: "The color of the text.",
                                usage: "-fcolor=[color name or #hex]",
                                default: "black",
                                moreOptions: []
                            },
                            {
                                name: "Font size",
                                description: "The size of the font.",
                                usage: "-fsize=[1-1000]",
                                default: "50",
                                moreOptions: []
                            },
                            {
                                name: "Max text rows",
                                description: "The max rows of text.",
                                usage: "-rows=[1-6]",
                                default: "2",
                                moreOptions: []
                            },
                        ]
                    },
                    {
                        name: "File",
                        description: "Get the image/sticker as a file.",
                        usage: "-file or -f",
                        default: "False",
                        moreOptions: []
                    },
                ],
                aliases: ['removebg', 'rmbg']
            },
        }),
        toimage: generateCommandString({
            cmdName: 'toimage',
            cmdDescription: 'Convert a sticker to an image.',
            cmdUsage: {
                usage: `toimage or reply with the command to an image/sticker or send the image with caption toimage to receive an image.`,
                options: [
                    {
                        name: "Remove background",
                        description: "Remove the background of the image.",
                        usage: "-r",
                        default: "False",
                        moreOptions: []
                    },
                    {
                        name: "Background",
                        description: "The background of the image. (send an image (which you want it\'s background removed), then quote the image with the background picture you want)",
                        usage: "-bg",
                        default: "False",
                        moreOptions: [
                            {
                                name: "Background from url",
                                description: "The background of the image from a url.",
                                usage: "-url=[image link]",
                                default: "False",
                                moreOptions: []
                            },
                        ]
                    },
                    {
                        name: "Stroke",
                        description: "Add a stroke to the image.",
                        usage: "-s",
                        default: "False",
                        moreOptions: [
                            {
                                name: "Stroke size",
                                description: "The size of the stroke.",
                                usage: "-size=[1-10]",
                                default: "1",
                                moreOptions: []
                            },
                            {
                                name: "Stroke color",
                                description: "The color of the stroke.",
                                usage: "-color=[color name or #hex]",
                                default: "white",
                                moreOptions: []
                            },
                            {
                                name: "Stroke alpha",
                                description: "The alpha of the stroke.",
                                usage: "-alpha=[0-255]",
                                default: "255",
                                moreOptions: []
                            },
                        ]
                    },
                    {
                        name: "Text",
                        description: "Add text to the image.",
                        usage: "-t",
                        default: "False",
                        moreOptions: [
                            {
                                name: "Stroke color",
                                description: "The color of the stroke.",
                                usage: "-scolor=[color name or #hex]",
                                default: "white",
                                moreOptions: []
                            },
                            {
                                name: "Fill color",
                                description: "The color of the text.",
                                usage: "-fcolor=[color name or #hex]",
                                default: "black",
                                moreOptions: []
                            },
                            {
                                name: "Font size",
                                description: "The size of the font.",
                                usage: "-fsize=[1-1000]",
                                default: "50",
                                moreOptions: []
                            },
                            {
                                name: "Max text rows",
                                description: "The max rows of text.",
                                usage: "-rows=[1-6]",
                                default: "2",
                                moreOptions: []
                            },
                        ]
                    },
                    {
                        name: "File",
                        description: "Get the image/sticker as a file.",
                        usage: "-file or -f",
                        default: "False",
                        moreOptions: []
                    },
                ],
                aliases: ['toimage', 'image', 'img']
            },
        }),
        videotomp3: generateCommandString({
            cmdName: 'videotomp3',
            cmdDescription: 'Convert a video to audio.',
            cmdUsage: {
                usage: `videotomp3 or reply with videotomp3 to a video.`,
                options: [],
                aliases: ['videotomp3', 'v2mp3', 'v2m']
            },
        }),
        addBackground: generateCommandString({
            cmdName: 'addbackground',
            cmdDescription: `Add a background to an image. (Quoted image is the image and background is the message you're sending)`,
            cmdUsage: {
                usage: `addbackground or reply with addbackground to an image/sticker or send the image with caption addbackground to receive a file with the background added.`,
                options: [
                    {
                        name: "Background from url",
                        description: "Adds a background from a url.",
                        usage: "-url=[image link]",
                        default: "None",
                        moreOptions: []
                    },
                    {
                        name: "To Sticker",
                        description: "Converts the image to a sticker.",
                        usage: "-s/-sticker",
                        default: "False",
                        moreOptions: []
                    },

                ],
                aliases: ['addbackground', 'bg']
            }
        }),
    },
    Help: {
        help: `Oh, I see you've found the 🐰 🥚\n${b('What did you expect to find here...? ')}\n\nWell if you're already here, I have a cool story for you which starts like this...\n\n`
    }
}

module.exports = {
    b, m, i,
    help,
    returnType,
    prefix
}


function generateCommandString(json) {
    let commandString = `${b('Command Name:')} ${json.cmdName}\n\n`;
    commandString += `${b('Description:')} ${json.cmdDescription}\n\n`;
    commandString += `${b('Usage:')} ${prefix}${json.cmdUsage.usage}\n\n`;
    if (json.cmdUsage.options.length) commandString += `${b('Options:')}\n`;

    function recursivelyPrintOptions(options, level) {
        options.forEach((option) => {
            commandString += `${'  '.repeat(level)}• ${option.name}: ${option.description}\n`;
            if (option.usage) commandString += `${'  '.repeat(level)}Usage: (${option.usage})\n`;
            if (option.moreOptions) recursivelyPrintOptions(option.moreOptions, level + 1);
            if (option.default) commandString += `${'  '.repeat(level)}Default: ${option.default}\n`;
            if (level === 0) commandString += '---------------------';
            if (option.moreOptions || option.default || option.usage) commandString += '\n';
        });
    }

    recursivelyPrintOptions(json.cmdUsage.options, 0);

    commandString += `\n${b('Aliases:')} ${json.cmdUsage.aliases.join(', ')}`;
    return commandString;
}