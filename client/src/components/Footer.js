



const Footer = ()=>{
    return (
        <div className="md:flex p-4 bg-tertiary text-beige justify-between items-center">
            <div>
                <h4 className="font-bold text-center">Download our app</h4>
                <p className="text-center">Download App for Android and <br/> IOS mobile phone</p>
            </div>
            <div className="border-1 border-white-700 ">
                <h3 className="text-4xl text-center text-secondary">Recycle your E-Waste today!</h3>
            </div>
            <div className="md : flex gap-5">
                <div>
                    <h6 className="font-bold underline text-xl">Follow us</h6>
                    <div className="text-center m-2">Instagram</div>
                    <div className="text-center m-2">Youtube</div>
                    <div className="text-center m-2">Facebook</div>

                </div>
                <div>
                    <img className="h-12" src="https://via.placeholder.com/300"/>
                </div>
            </div>
        </div>
    )
}
export default Footer;