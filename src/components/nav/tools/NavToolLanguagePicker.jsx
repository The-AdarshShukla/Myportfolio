import React, {useEffect, useState} from 'react'
import {useLanguage} from "/src/providers/LanguageProvider.jsx"
import OptionPickerButton from "/src/components/buttons/OptionPickerButton.jsx"
import {useUtils} from "/src/hooks/utils.js"

function NavToolLanguagePicker() {
    const language = useLanguage()
    const utils = useUtils()

    const supportsMultipleLanguages = language.supportsMultipleLanguages
    const availableLanguages = language.getAvailableLanguages(false)
    
    // Forcefully keep the selected language strictly as "en" (English)
    const selectedLanguage = availableLanguages.find(lang => lang.id === "en") || language.getSelectedLanguage()

    const options = availableLanguages.map(lang => {
        return {
            id: lang.id,
            label: lang.name,
            img: utils.file.resolvePath(lang.flagUrl)
        }
    })

    const _onOptionSelected = (optionId) => {
        // Yahan hum language change hone se rok rahe hain. 
        // Agar aap chahte hain ki sirf UI mein dropdown select ho par content English hi rahe, 
        // toh hum language.setSelectedLanguage() ko call nahi karenge.
        
        console.log("Language selection intercepted. Keeping website language as English.");
        
        // Optional: Agar aap chahte hain ki 'en' hi set rahe backend mein bhi:
        const englishLang = availableLanguages.find(lang => lang.id === "en")
        if(englishLang) {
            language.setSelectedLanguage(englishLang)
        }
    }

    return (
        <>
            {supportsMultipleLanguages && (
                <OptionPickerButton mode={OptionPickerButton.Modes.MODE_DROPDOWN}
                                    options={options}
                                    selectedOptionId={selectedLanguage?.id}
                                    onOptionSelected={_onOptionSelected}
                                    tooltipLabel={language.getString("select_language")}/>
            )}
        </>
    )
}

export default NavToolLanguagePicker