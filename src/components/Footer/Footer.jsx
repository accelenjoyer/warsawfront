import React from 'react';
import "./Footer.scss"
import Image from "next/image";
import title from "../../../public/title.png";
const Footer = () => {
    return (
        <div className="footer-container">
            <div className="footer-block">
                <Image src={title} alt="title" width={150} height={20} />
            </div>
            <div className="footer-block">
                <span>Русский</span>
                <span>Английский</span>
            </div>
            <div className="footer-block">
                <div className="text-area">
                    <p>
                        Внимание! При использовании материалов нашего сайта на других интернет-сайтах прямая активная гиперссылка на страницу, содержащую оригинал публикации, обязательна. Ссылка должна быть заметной и располагаться в самом начале публикации. Подробнее о рекламе.
                    </p>
                </div>

            </div>

        </div>
    );
};

export default Footer;