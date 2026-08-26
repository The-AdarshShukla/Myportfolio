import "./ArticleEducation.scss"
import React, { useState } from 'react'
import Article from "/src/components/articles/base/Article.jsx"
import Transitionable from "/src/components/capabilities/Transitionable.jsx"
import { useViewport } from "/src/providers/ViewportProvider.jsx"
import { useConstants } from "/src/hooks/constants.js"
import AvatarView from "/src/components/generic/AvatarView.jsx"
import { Tag, Tags } from "/src/components/generic/Tags.jsx"
import { useLanguage } from "/src/providers/LanguageProvider.jsx"

function ArticleEducation({ dataWrapper }) {
    const [selectedItemCategoryId, setSelectedItemCategoryId] = useState(null)

    return (
        <Article id={dataWrapper.uniqueId}
                 type={Article.Types.SPACING_DEFAULT}
                 dataWrapper={dataWrapper}
                 className={`article-education`}
                 selectedItemCategoryId={selectedItemCategoryId}
                 setSelectedItemCategoryId={setSelectedItemCategoryId}>
            <ArticleEducationItems dataWrapper={dataWrapper}
                                   selectedItemCategoryId={selectedItemCategoryId}/>
        </Article>
    )
}

function ArticleEducationItems({ dataWrapper, selectedItemCategoryId }) {
    const constants = useConstants()
    const language = useLanguage()
    const viewport = useViewport()

    const filteredItems = dataWrapper.getOrderedItemsFilteredBy(selectedItemCategoryId)
    const customBreakpoint = viewport.getCustomBreakpoint(constants.SWIPER_BREAKPOINTS_FOR_THREE_SLIDES)

    const itemsPerRow = customBreakpoint?.slidesPerView || 1
    const itemsPerRowClass = `article-education-items-${itemsPerRow}-per-row`

    const refreshFlag = dataWrapper.categories?.length ?
        selectedItemCategoryId + "-" + language.getSelectedLanguage()?.id :
        language.getSelectedLanguage()?.id

    if(dataWrapper.categories?.length) {
        return (
            <Transitionable id={dataWrapper.uniqueId}
                            refreshFlag={refreshFlag}
                            delayBetweenItems={100}
                            animation={Transitionable.Animations.POP}
                            className={`article-education-items ${itemsPerRowClass}`}>
                {filteredItems.map((itemWrapper, key) => (
                    <ArticleEducationItem itemWrapper={itemWrapper} key={key}/>
                ))}
            </Transitionable>
        )
    } else {
        return (
            <div className={`article-education-items ${itemsPerRowClass} mb-3 mb-lg-2`}>
                {filteredItems.map((itemWrapper, key) => (
                    <ArticleEducationItem itemWrapper={itemWrapper} key={key}/>
                ))}
            </div>
        )
    }
}

function ArticleEducationItem({ itemWrapper }) {
    return (
        <div className={`article-education-item`}>
            <AvatarView src={itemWrapper.img}
                        faIcon={itemWrapper.faIcon}
                        style={itemWrapper.faIconStyle}
                        alt={itemWrapper.imageAlt}
                        className={`article-education-item-avatar`}/>

            <div className={`article-education-item-title`}>
                <h5 dangerouslySetInnerHTML={{__html: itemWrapper.locales.title || itemWrapper.placeholder}}/>
                <div className={`article-education-item-title-category text-2`}
                     dangerouslySetInnerHTML={{__html: itemWrapper.category?.label }}/>
            </div>

            <div className={`article-education-item-body`}>
                {itemWrapper.locales.tags && Boolean(itemWrapper.locales.tags.length) && (
                    <Tags className={`article-education-item-body-tags`}>
                        {itemWrapper.locales.tags.map((tag, key) => (
                            <Tag key={key}
                                 text={tag}
                                 variant={Tag.Variants.DARK}
                                 className={`article-education-item-body-tag text-1`}/>
                        ))}
                    </Tags>
                )}
                <div className={`article-education-item-body-description text-2`}
                     dangerouslySetInnerHTML={{__html: itemWrapper.locales.text}}/>
            </div>
        </div>
    )
}

export default ArticleEducation