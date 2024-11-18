function FindProxyForURL(url, host) {
    if (/^(.*amazon\.co\.jp|.*amazonaws\.com|.*android\.com|.*aspnetcdn\.com|.*bootstrapcdn\.com|.*chrome\.com|.*dmm\.co\.jp|.*ggpht\.com|.*githubassets\.com|.*githubusercontent\.com|.*goo\.gl|.*google\.co\.jp|.*google\.com|.*google\.com\.hk|.*googleapis\.com|.*googlevideo\.com|.*gstatic\.com|.*imgur\.com|.*muchohentai\.com|.*nyaa\.si|.*pixiv\.net|.*pornhub\.com|.*pximg\.net|.*sentry-cdn\.com|.*steamcommunity\.com|.*suno\.ai|.*suno\.com|.*syosetu\.com|.*twimg\.com|.*twitch\.tv|.*twitchcdn\.net|.*twitter\.com|.*wikipedia\.org|.*x\.com|.*xvideos-cdn\.com|.*xvideos\.com|.*youtu\.be|.*youtube\.com|.*ytimg\.com|copilot\.microsoft\.com|sydney\.bing\.com|.*googleusercontent\.com|.*dlsite\.com|.*discord\.gg|.*discord\.com|.*discordapp\.net|.*discordapp\.com|.*archive\.org)$/i.test(host)) {
        return "SOCKS5 127.0.0.1:7890";
    }
    return "DIRECT";
}