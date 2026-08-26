import React from 'react'
import {useLanguage} from "/src/providers/LanguageProvider.jsx"
import OptionPickerButton from "/src/components/buttons/OptionPickerButton.jsx"
import {useFeedbacks} from "/src/providers/FeedbacksProvider.jsx"
import {useData} from "/src/providers/DataProvider.jsx"
import {useUtils} from "/src/hooks/utils.js"

function NavToolSettings({ options }) {
    const language = useLanguage()
    const feedbacks = useFeedbacks()
    const data = useData()
    const utils = useUtils()

    const displayOptions = [{
        id: "options",
        faIcon: "fa-solid fa-cog",
        label: language.getString("options") || "Settings"
    }]

    // 1. Cursor option check
    if(options.includes(NavToolSettings.Options.CURSOR)) {
        const isEnabledAndActive = feedbacks.animatedCursorEnabled && feedbacks.animatedCursorActive
        displayOptions.push({
            id: NavToolSettings.Options.CURSOR,
            faIcon: isEnabledAndActive ? "fa-solid fa-wand-magic-sparkles" : "fa-solid fa-wand-magic",
            label: language.getString(isEnabledAndActive ? "deactivate_magic_cursor" : "activate_magic_cursor") || "Magic Cursor"
        })
    }

    // 2. Fullscreen feature check (New Advanced Feature)
    if(options.includes(NavToolSettings.Options.FULLSCREEN)) {
        const isFullscreen = document.fullscreenElement !== null
        displayOptions.push({
            id: NavToolSettings.Options.FULLSCREEN,
            faIcon: isFullscreen ? "fa-solid fa-compress" : "fa-solid fa-expand",
            label: language.getString("toggle_fullscreen") || "Toggle Fullscreen"
        })
    }

    // 3. Sound Effects feature check (New Advanced Feature)
    if(options.includes(NavToolSettings.Options.SOUND)) {
        const soundEnabled = feedbacks.soundEnabled // Provider ke anusar variable adjust kar sakte hain
        displayOptions.push({
            id: NavToolSettings.Options.SOUND,
            faIcon: soundEnabled ? "fa-solid fa-volume-high" : "fa-solid fa-volume-xmark",
            label: language.getString("toggle_sound") || "Sound Effects"
        })
    }

    // 4. Extra FX / Animations feature check
   

    // 5. Reset / Clear Preferences (New Useful Feature)
    if(options.includes(NavToolSettings.Options.RESET)) {
        displayOptions.push({
            id: NavToolSettings.Options.RESET,
            faIcon: "fa-solid fa-rotate-right",
            label: language.getString("reset_settings") || "Reset Preferences"
        })
    }

    // 6. Download Resume option check (agar settings ke andar bhi backup ke taur par rakhna ho)
    if(options.includes(NavToolSettings.Options.DOWNLOAD_RESUME)) {
        displayOptions.push({
            id: NavToolSettings.Options.DOWNLOAD_RESUME,
            faIcon: "fa-solid fa-file-arrow-down",
            label: language.getString("download_resume") || "Download Resume"
        })
    }

    const _onOptionClicked = (optionId) => {
        switch (optionId) {
            case NavToolSettings.Options.CURSOR:
                feedbacks.toggleAnimatedCursorActive(!feedbacks.animatedCursorActive)
                break

            case NavToolSettings.Options.FULLSCREEN:
                if (!document.fullscreenElement) {
                    document.documentElement.requestFullscreen().catch(err => {
                        console.error(`Error attempting to enable fullscreen: ${err.message}`);
                    });
                } else {
                    if (document.exitFullscreen) {
                        document.exitFullscreen();
                    }
                }
                break

            case NavToolSettings.Options.SOUND:
                if (typeof feedbacks.toggleSound === 'function') {
                    feedbacks.toggleSound()
                } else {
                    console.log("Sound toggle function not found in FeedbacksProvider")
                }
                break

            case NavToolSettings.Options.EXTRA_FX:
                // Agar aapke paas Extra FX toggle karne ka koi function hai toh yahan call karein
                console.log("Extra FX toggled!")
                break

            case NavToolSettings.Options.RESET:
                // LocalStorage clear karke page refresh karne ka logic
                if (window.confirm("Do you want to reset all settings?")) {
                    localStorage.clear()
                    window.location.reload()
                }
                break

            case NavToolSettings.Options.DOWNLOAD_RESUME:
                const profile = data.getProfile()
                const resumeUrl = profile.resumePdfUrl
                utils.file.download(resumeUrl)
                break
        }
    }

    return (
        <OptionPickerButton mode={OptionPickerButton.Modes.MODE_DROPDOWN}
                            options={displayOptions}
                            selectedOptionId={"options"}
                            onOptionSelected={_onOptionClicked}
                            tooltipLabel={displayOptions[0].label}/>
    )
}

NavToolSettings.Options = {
    CURSOR: "cursor",
    FULLSCREEN: "fullscreen",
    SOUND: "sound",
    EXTRA_FX: "extra_fx",
    RESET: "reset",
    DOWNLOAD_RESUME: "download_resume"
}

export default NavToolSettings