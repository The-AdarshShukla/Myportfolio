import "./ArticleCertifications.scss"
import React, { useState } from 'react'
import Article from "/src/components/articles/base/Article.jsx"
import Swipeable from "/src/components/capabilities/Swipeable.jsx"
import { Balloon, BalloonQuote } from "/src/components/generic/Balloon"
import { useViewport } from "/src/providers/ViewportProvider.jsx"
import Link from "/src/components/generic/Link.jsx"
import AvatarView from "/src/components/generic/AvatarView.jsx"
import { useConstants } from "/src/hooks/constants.js"

function ArticleCertifications({ dataWrapper, id }) {
    const [selectedItemCategoryId, setSelectedItemCategoryId] = useState(null)

    const settings = dataWrapper?.settings || {}
    const locales = dataWrapper?.locales || {}
    const categories = dataWrapper?.categories || []

    const subtitle = locales.subtitle || ""
    const showFilter = settings.showCategory_filter !== false && categories.length > 1

    const handleCategorySelect = (categoryId) => {
        setSelectedItemCategoryId(categoryId === "category_all" ? null : categoryId)
    }

    return (
        <Article id={dataWrapper?.uniqueId || id}
                 type={Article.Types.SPACING_DEFAULT}
                 dataWrapper={dataWrapper}
                 className={`article-certifications`}
                 selectedItemCategoryId={selectedItemCategoryId}
                 setSelectedItemCategoryId={setSelectedItemCategoryId}>
            
            {/* Subtitle and Filters Header */}
            <div className="article-certifications-header">
                {subtitle && (
                    <p className="article-certifications-subtitle text-4"
                       dangerouslySetInnerHTML={{ __html: subtitle }} />
                )}

                {showFilter && (
                    <div className="article-certifications-filters">
                        {categories.map((cat) => {
                            const isActive = (selectedItemCategoryId === cat.id) || (!selectedItemCategoryId && cat.all)
                            return (
                                <button
                                    key={cat.id}
                                    className={`filter-pill ${isActive ? 'active' : ''}`}
                                    onClick={() => handleCategorySelect(cat.id)}
                                >
                                    <span dangerouslySetInnerHTML={{ __html: cat.label?.en || cat.label || cat.id }} />
                                </button>
                            )
                        })}
                    </div>
                )}
            </div>

            <ArticleCertificationsItems dataWrapper={dataWrapper}
                                      selectedItemCategoryId={selectedItemCategoryId}/>
        </Article>
    )
}

function ArticleCertificationsItems({ dataWrapper, selectedItemCategoryId }) {
    const constants = useConstants()
    const filteredItems = dataWrapper?.getOrderedItemsFilteredBy ? 
        dataWrapper.getOrderedItemsFilteredBy(selectedItemCategoryId) : 
        (dataWrapper?.orderedItems || [])

    return (
        <Swipeable className={`article-certifications-items`}
                   breakpoints={constants?.SWIPER_BREAKPOINTS_FOR_THREE_SLIDES}>
            {filteredItems.map((itemWrapper, key) => (
                <ArticleCertificationsItem itemWrapper={itemWrapper}
                                           key={itemWrapper?.id || key}/>
            ))}
        </Swipeable>
    )
}

function ArticleCertificationsItem({ itemWrapper }) {
    const viewport = useViewport()
    const textClass = viewport?.isMobileLayout() ? `text-3` : `text-2`
    
    const iconStyle = {
        ...(itemWrapper?.faIconStyle || {}),
        ...(itemWrapper?.badgeColor ? { color: itemWrapper.badgeColor } : {})
    }

    return (
        <div className={`article-certifications-item`}>
            <div className={`article-certifications-item-info`}>
                <AvatarView src={itemWrapper?.img}
                            faIcon={itemWrapper?.faIconWithFallback}
                            style={iconStyle}
                            alt={itemWrapper?.imageAlt}
                            className={`article-certifications-item-avatar`}/>

                <div className={`article-certifications-item-role text-2`}
                     dangerouslySetInnerHTML={{__html: itemWrapper?.locales?.title || itemWrapper?.label || "---"}}/>
            </div>

            <Balloon className={`article-certifications-item-balloon`}>
                <BalloonQuote className={`${textClass}`}
                            text={itemWrapper?.locales?.text || itemWrapper?.placeholder || ""}/>
            </Balloon>

            <div className={`article-certifications-footer`}>
                <Link href={itemWrapper?.link?.href}
                      tooltip={itemWrapper?.link?.tooltip}
                      className={`article-certifications-btn text-5`}>
                    <span dangerouslySetInnerHTML={{__html: itemWrapper?.locales?.label || itemWrapper?.label || "View Certificate"}}/>
                </Link>
            </div>
        </div>
    )
}

export default ArticleCertifications