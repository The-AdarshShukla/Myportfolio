import "./NavToolList.scss"
import React from 'react'
import {useLanguage} from "/src/providers/LanguageProvider.jsx"
import {useTheme} from "/src/providers/ThemeProvider.jsx"
import {useFeedbacks} from "/src/providers/FeedbacksProvider.jsx"
import {useData} from "/src/providers/DataProvider.jsx"
import NavToolLanguagePicker from "/src/components/nav/tools/NavToolLanguagePicker.jsx"
import NavToolThemePicker from "/src/components/nav/tools/NavToolThemePicker.jsx"
import NavToolResumeDownloader from "/src/components/nav/tools/NavToolResumeDownloader.jsx"
import NavToolSettings from "/src/components/nav/tools/NavToolSettings.jsx"
import NavToolCursorToggle from "/src/components/nav/tools/NavToolCursorToggle.jsx"
import NavToolFullscreenToggle from "/src/components/nav/tools/NavToolFullscreenToggle.jsx"

function NavToolList({ expanded }) {
    const language = useLanguage()
    const theme = useTheme()
    const feedbacks = useFeedbacks()
    const data = useData()

    const profile = data.getProfile()

    // Agar expanded hai toh sabhi widgets dikhenge, 
    // lekin jab shrink ho (!expanded) toh hum sirf Language aur Settings dikhana chahte hain.
    const visibleWidgets = expanded ? [
        ...(language.supportsMultipleLanguages ? ["language"] : []),
        ...(theme.supportsMultipleThemes ? ["theme"] : []),
        ...(profile.resumePdfUrl ? [NavToolSettings.Options.DOWNLOAD_RESUME] : []),
    ] : [
        // Shrink hone par sirf yeh wala item ya jo aap chahein rakhein
        ...(language.supportsMultipleLanguages ? ["language"] : []),
    ]

    const groupedWidgets = expanded ? [
        ...(feedbacks.animatedCursorEnabled ? [NavToolSettings.Options.CURSOR] : []),
        NavToolSettings.Options.EXTRA_FX,
    ] : [
        // Shrink hone par settings ke andar ya direct 2sra icon
        NavToolSettings.Options.EXTRA_FX
    ]

    const shrinkClass = expanded ? `` : `nav-tools-shrink`

    return (
        <div className={`nav-tools ${shrinkClass}`}>
            {visibleWidgets.map((item, key) => (
                <div className={`nav-tools-item`} key={key}>
                    {item === "language" && (<NavToolLanguagePicker/>)}
                    {item === "theme" && (<NavToolThemePicker/>)}
                    {item === NavToolSettings.Options.DOWNLOAD_RESUME && (<NavToolResumeDownloader/>)}
                </div>
            ))}

            {/* 4th Icon / Settings Menu - Yeh hamesha dikhega taaki shrink hone par bhi 2nd icon (Settings/Gear) mil sake */}
            {(groupedWidgets.length > 0 || !expanded) && (
                <div className={`nav-tools-item`}>
                    <NavToolSettings options={groupedWidgets}/>
                </div>
            )}
        </div>
    )
}

export default NavToolList