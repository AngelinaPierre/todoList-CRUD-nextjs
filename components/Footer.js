import React from 'react'

export default function Footer() {
    return (
        <div className='flex justify-center items-center gap-5 py-3'>
            <a href="#" target='_blank'>
                <i className="fa-brands fa-instagram duration-300 hover:opacity-30 cursor-pointer"></i>
            </a>
            <a href="https://www.linkedin.com/in/gabrielle-angelina-pierre-tripodi-pereira-3540081b7/" target='_blank'>
                <i className="fa-brands fa-linkedin duration-300 hover:opacity-30 cursor-pointer"></i>
            </a>
            <a href="https://github.com/AngelinaPierre" target='_blank'>
                <i className="fa-brands fa-github-alt duration-300 hover:opacity-30 cursor-pointer"></i>
            </a>
        </div>
    )
}
