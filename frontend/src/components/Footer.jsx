const Footer = () => {
    const date = new Date();
    const currentYear = date.getFullYear();

    return (
        <div className="footer">
            <small>&#169; Josh Ivan Lanuevo {currentYear}</small>
        </div>
    )
}

export default Footer;