import "./ArticleSupportWork.scss"
import React from 'react'
import Article from "/src/components/articles/base/Article.jsx"
import Link from "/src/components/generic/Link.jsx"

/**
 * @param {ArticleDataWrapper} dataWrapper
 * @return {JSX.Element}
 * @constructor
 */
function ArticleSupportWork({ dataWrapper }) {
    // Safety check: Agar dataWrapper ya locales na ho toh app crash na ho
    const currentLocale = dataWrapper?.locale || "en";
    const localesData = dataWrapper?.locales?.[currentLocale] || dataWrapper?.locales?.en || {};

    const description = localesData.description || "";
    const subDescription = localesData.sub_description || "";
    const buttonText = localesData.button_text || "Buy Me a Coffee";
    
    const coffeeLink = dataWrapper?.settings?.coffee_link || "#";
    const customImage = dataWrapper?.settings?.image || "";

    return (
        <Article id={dataWrapper?.uniqueId || "support-work"}
                 type={Article.Types.SPACING_DEFAULT}
                 dataWrapper={dataWrapper}
                 className={`article-support-work`}>
            
            <div className={`article-support-work-container`}>
                {/* Left Side: Blob & Custom Image */}
                <div className={`article-support-work-graphic`}>
                    <div className="blob-bg">
                        <div className="coffee-image-container">
                            {customImage ? (
                                <img src={customImage} alt="Support Work" className="support-custom-img" />
                            ) : (
                                <span className="fallback-emoji">☕</span>
                            )}
                        </div>
                    </div>
                </div>

                {/* Right Side: Descriptions & Button */}
                <div className={`article-support-work-info`}>
                    {description && (
                        <div className={`article-support-work-text text-2`}
                             dangerouslySetInnerHTML={{__html: description}}/>
                    )}

                    {subDescription && (
                        <div className={`article-support-work-subtext text-3`}
                             dangerouslySetInnerHTML={{__html: subDescription}}/>
                    )}

                    {coffeeLink && (
                        <Link href={coffeeLink}
                              target="_blank"
                              className={`article-support-work-btn btn btn-primary`}>
                            <span className="btn-icon">☕</span>
                            <span dangerouslySetInnerHTML={{__html: buttonText}}/>
                        </Link>
                    )}
                </div>
            </div>
        </Article>
    )
}

export default ArticleSupportWork