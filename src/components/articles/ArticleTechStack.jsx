import "./ArticleTechStack.scss"
import React, { useState } from 'react'
import Article from "/src/components/articles/base/Article.jsx"
import Transitionable from "/src/components/capabilities/Transitionable.jsx"
import { useViewport } from "/src/providers/ViewportProvider.jsx"
import { useConstants } from "/src/hooks/constants.js"
import AvatarView from "/src/components/generic/AvatarView.jsx"
import { useLanguage } from "/src/providers/LanguageProvider.jsx"

/**
 * @param {ArticleDataWrapper} dataWrapper
 * @param {Number} id
 * @return {JSX.Element}
 * @constructor
 */
function ArticleTechStack({ dataWrapper, id }) {
    const [selectedItemCategoryId, setSelectedItemCategoryId] = useState(null)
    const language = useLanguage()
    const currentLang = language.getSelectedLanguage()?.id || 'en'

    // JSON ke settings/categories ko Base Article ke anukul Array me badalna
    if ((!dataWrapper.categories || dataWrapper.categories.length === 0) && dataWrapper.settings?.categorize_by) {
        const catKeys = dataWrapper.settings.categorize_by
        
        // "All" category ko dynamically count ke sath pehle add karna
        const allCount = dataWrapper.items ? dataWrapper.items.length : 0
        
        let categoriesArray = [
            {
                id: null,
                label: `All (${allCount})`,
            }
        ]

        catKeys.forEach(catKey => {
            const count = dataWrapper.items ? dataWrapper.items.filter(item => item.categoryId === catKey).length : 0
            
            // Articles ke locales ya default label se text uthana agar available ho
            let labelText = catKey.replace('category_', '')
            labelText = labelText.charAt(0).toUpperCase() + labelText.slice(1)

            if (dataWrapper.articles?.[0]?.locales?.[currentLang]?.[catKey]) {
                labelText = dataWrapper.articles[0].locales[currentLang][catKey]
            }

            categoriesArray.push({
                id: catKey,
                label: `${labelText} (${count})`,
                count: count
            })
        })

        dataWrapper.categories = categoriesArray
    }

    return (
        <Article id={dataWrapper.uniqueId}
                 type={Article.Types.SPACING_DEFAULT}
                 dataWrapper={dataWrapper}
                 className={`article-tech-stack`}
                 selectedItemCategoryId={selectedItemCategoryId}
                 setSelectedItemCategoryId={setSelectedItemCategoryId}>
            
            <ArticleTechStackItems dataWrapper={dataWrapper}
                                   selectedItemCategoryId={selectedItemCategoryId}/>
        </Article>
    )
}

/**
 * @param {ArticleDataWrapper} dataWrapper
 * @param {String} selectedItemCategoryId
 * @return {JSX.Element}
 * @constructor
 */
function ArticleTechStackItems({ dataWrapper, selectedItemCategoryId }) {
    const constants = useConstants()
    const language = useLanguage()
    const viewport = useViewport()

    const filteredItems = dataWrapper.getOrderedItemsFilteredBy(selectedItemCategoryId)
    const customBreakpoint = viewport.getCustomBreakpoint(constants.SWIPER_BREAKPOINTS_FOR_THREE_SLIDES)

    const itemsPerRow = customBreakpoint?.slidesPerView || 4 
    const itemsPerRowClass = `article-tech-stack-items-${itemsPerRow}-per-row`

    const refreshFlag = dataWrapper.categories?.length ?
        selectedItemCategoryId + "-" + language.getSelectedLanguage()?.id :
        language.getSelectedLanguage()?.id

    if (dataWrapper.categories?.length) {
        return (
            <Transitionable id={dataWrapper.uniqueId}
                            refreshFlag={refreshFlag}
                            delayBetweenItems={50}
                            animation={Transitionable.Animations.POP}
                            className={`article-tech-stack-items ${itemsPerRowClass}`}>
                {filteredItems.map((itemWrapper, key) => (
                    <ArticleTechStackItem itemWrapper={itemWrapper} key={key}/>
                ))}
            </Transitionable>
        )
    } else {
        return (
            <div className={`article-tech-stack-items ${itemsPerRowClass} mb-3 mb-lg-2`}>
                {filteredItems.map((itemWrapper, key) => (
                    <ArticleTechStackItem itemWrapper={itemWrapper} key={key}/>
                ))}
            </div>
        )
    }
}

/**
 * @param {ArticleItemDataWrapper} itemWrapper
 * @return {JSX.Element}
 * @constructor
 */
function ArticleTechStackItem({ itemWrapper }) {
    return (
        <div className={`article-tech-stack-item`}>
            <AvatarView src={itemWrapper.img}
                        faIcon={itemWrapper.faIcon}
                        style={itemWrapper.faIconStyle}
                        alt={itemWrapper.imageAlt}
                        className={`article-tech-stack-item-avatar`}/>

            <div className={`article-tech-stack-item-title`}>
                <span className={`article-tech-stack-item-name`}
                    dangerouslySetInnerHTML={{ __html: itemWrapper.locales.title || itemWrapper.placeholder }}/>
            </div>
        </div>
    )
}

export default ArticleTechStack