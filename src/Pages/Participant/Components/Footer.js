import glints from '../../../Assets/images/glints.png';
import binar from '../../../Assets/images/binar.png';
import { Link } from "react-router-dom"

function Footer () {
	return (
		<div className='footerContainer'>
			<div className='footerNew'>
				<div className='footerInfo'>
					<div className='footerInfoLeft'>
						{/* <div className='footerLogo'>
							<img src={logo} alt='RealizDea' />
							<h4>RealizDea</h4>
						</div> */}
						<h6>About Us</h6>
						<p>RealizDea is created by Team C for the final project of Glints Academy batch #9.</p>
						<button onclick="location.href='/about'">Contact Us</button>
					</div>
					<div className='footerInfoRight'>
						<div className='footerPowered'>
							<h6>Powered by</h6>
							<a href='https://academy.glints.com/' target='_blank'><img src={glints} alt='Glints Academy' /></a>
							<a href='https://www.binaracademy.com/' target='_blank'><img src={binar} alt='Binar Academy'/></a>
						</div>
						<div className='footerTribute'>
							<h6>Tribute</h6>
							<p>Illustrations made by <a href="https://undraw.co/license" target='_blank' title="Katerina Limpitsouni">Katerina Limpitsouni</a> from <a href="https://undraw.co/illustrations" target='_blank' title="unDraw">www.undraw.co</a></p>
							<p>Icons made by <a href="https://www.flaticon.com/authors/pixel-perfect" target='_blank' title="Pixel perfect">Pixel perfect</a>, <a href="https://www.flaticon.com/authors/good-ware" target='_blank' title="Good Ware">Good Ware</a>, <a href="https://smashicons.com/" target='_blank' title="Smashicons">Smashicons</a>, and <a href="https://www.freepik.com" target='_blank' title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" target='_blank' title="Flaticon">www.flaticon.com</a></p>
						</div>
					</div>
				</div>
				<p className='footerCopy'>Copyright © 2021 RealizDea All Rights Reserved.</p>
			</div>
		</div>
	);
}

export default Footer;