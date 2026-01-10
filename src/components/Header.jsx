import logo from '../assets/logo.png'
import { useState } from 'react'
export default function Header ({scrollToTarget}) {
const [showHelp, setShowHelp] = useState(false);

    return (
        <>
        <div id="header-wrapper">
            <div id="header">
                <div className='logo'>
                    <img src={logo} alt='logo' id="logo-img"></img>
                    <h1 id="label">KantorX</h1>
                </div>
                
                <div className='navigation'>
                    <button className='nav-btn' onClick={() => setShowHelp(!showHelp)}>Help</button>
                    {showHelp && (<div>
                        Some text.
                    </div>)}
                    <button className='nav-btn' onClick={() => scrollToTarget()}>Charts</button>
                </div>
            </div>
        </div>
        </>
    )
}