import { Fragment } from 'react';
import './breadcrumbs.css';

export default function Breadcrumbs({ breadcrumbs }) {
    return (
        <nav className='breadcrumbs-nav'>
            <button className='breadcrumbs-nav__back btn'><span><i className="bi bi-arrow-left"></i></span>Kembali</button>
            <ul className='breadcrumbs-nav__list'>
                {breadcrumbs.map(
                    (item, i) => {
                        return <Fragment key={i}>
                            {
                                (breadcrumbs.length !== (i + 1))
                                    ?
                                    <>
                                        <li className='breadcrumbs-nav__item'><a href={item.url}>{item.name}</a></li>
                                        <span>/</span>
                                    </>
                                    :
                                    <>
                                        <li className='breadcrumbs-nav__item'><a>{item.name}</a></li>
                                    </>
                            }
                        </Fragment>
                    }
                )}
            </ul>
        </nav>
    )
}