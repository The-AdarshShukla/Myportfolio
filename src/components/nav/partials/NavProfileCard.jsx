import "./NavProfileCard.scss"
import React from 'react'
import { Card } from "react-bootstrap"
import { useLanguage } from "/src/providers/LanguageProvider.jsx"
import { useNavigation } from "/src/providers/NavigationProvider.jsx"
import { useUtils } from "/src/hooks/utils.js"
import ImageView from "/src/components/generic/ImageView.jsx"
import TextTyper from "/src/components/generic/TextTyper.jsx"
import AudioButton from "/src/components/buttons/AudioButton.jsx"

function NavProfileCard({ profile, expanded }) {
    const language = useLanguage()
    const utils = useUtils()

    const expandedClass = expanded ? `` : `nav-profile-card-shrink`

    const name = profile.name
    const stylizedName = language.getTranslation(profile.locales, "localized_name_stylized", null) ||
        language.getTranslation(profile.locales, "localized_name", null) ||
        name

    let roles = language.getTranslation(profile.locales, "roles", [])
    if (utils.storage.getWindowVariable("suspendAnimations") && roles.length > 2)
        roles = [roles[0]]

    const profilePictureUrl = language.parseJsonText(profile.profilePictureUrl)

    const namePronunciationIpa = language.getTranslation(profile.locales, "name_pronunciation_ipa", null)
    const namePronunciationAudioUrl = language.getTranslation(profile.locales, "name_pronunciation_audio_url", null)
    const namePronunciationButtonVisible = namePronunciationIpa || namePronunciationAudioUrl

    const navProfileCardNameClass = namePronunciationButtonVisible ?
        `nav-profile-card-name-with-audio-button` :
        ``

    return (
        <Card className={`nav-profile-card ${expandedClass}`}>
            <div className="nav-profile-card-avatar-wrapper">
                <ImageView src={profilePictureUrl}
                           className={`nav-profile-card-avatar`}
                           hideSpinner={true}
                           alt={name}/>
            </div>

            <div className={`nav-profile-card-info`}>
                <h1 className={`nav-profile-card-name ${navProfileCardNameClass}`}>
                    <span dangerouslySetInnerHTML={{__html: stylizedName}}/>
                    {namePronunciationButtonVisible && (
                        <AudioButton url={namePronunciationAudioUrl}
                                     tooltip={namePronunciationIpa}
                                     size={AudioButton.Sizes.DYNAMIC_FOR_NAV_TITLE}/>
                    )}
                </h1>

                {roles?.length > 1 && (
                    <TextTyper strings={roles}
                               id={`role-typer`}
                               cursor={false}
                               showCursor={false}
                               className={`nav-profile-card-role`}/>
                )}

                {roles?.length === 1 && (
                    <div className={`nav-profile-card-role`}
                         dangerouslySetInnerHTML={{__html: roles[0]}}/>
                )}
            </div>
        </Card>
    )
}

export default NavProfileCard