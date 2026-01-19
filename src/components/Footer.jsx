import { useTranslation } from "react-i18next";




export default function Footer () {

    const {i18n, t} = useTranslation();

    return (
        <div className="footer-wrapper">
            <div className="footer-background">
                <div className="footer-inner">
                    <h1 className="h1foot">{t("contact")}</h1>
                    <div className="contacts">
                        <p>{t("tel")}</p>
                        <p>Mail: daniilsokolyuk2006@gmail.com</p>
                    </div>
                    <h1 className="thx">{t("thanks")}</h1>
                </div>
            </div>
        </div>
    )
}
{/* <h1>Contact:</h1>
<p>Tel: +48-501-690-319</p>
<p>Mail: daniilsokolyuk2006@gmail.com</p>
 */}