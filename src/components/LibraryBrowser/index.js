import React, {useState, useEffect} from "react"
import {withFirebase} from "../../functions/Firebase";
import { Link } from 'react-router-dom';

import * as ROUTES from '../../constants/routes';
import './style.scss';
import { GoTriangleRight, GoTriangleLeft } from "react-icons/go";
import { ImForward3, ImBackward2 } from "react-icons/im";

const LibraryBrowser = props => {
    const [list, setList] = useState([]);
    const [value, setValue] = useState(2);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchBooks = (n) => {
        setLoading(true);
        // console.log(n);
        props.firebase
            .books()
            .orderByChild("callnumber")
            .startAt(n)
            .limitToFirst(10)
            .once("value")
            .then(snap => {
                const snapObject = snap.val()
                const snapList = Object.keys(snapObject).map(key => ({
                        ...snapObject[key],
                        book_id: key,
                    }))
                setList(snapList);
                setLoading(false);        
            })
            .catch(error => {
                setError(error);
            })
    }

    const onForward =()=> {
        let n = value +10;
        let s = '';
        if (n < 126) {
            s = n.toString().padStart(4, '0');
        } else {
            s = n.toString();
        }
        fetchBooks(s);
        setValue(prevState => (prevState +10));
    }
    
    const onFastForward =()=> {
        let n = value +50;
        let s = '';
        if (n < 126) {
            s = n.toString().padStart(4, '0');
        } else {
            s = n.toString();
        }
        fetchBooks(s);
        setValue(prevState => (prevState +50));
    }

    const onBackward =()=> {
        let s = ''
        if (value < 11) {
            s = "0002";
            setValue(2);
        } else {
            const n = value - 10;
            if (n < 126) {
                s = n.toString().padStart(4, '0')
            } else {
                s = n.toString();
            }
            setValue(prevState => ( prevState -10))
        }
        fetchBooks(s);
    }

    const onFastBackward =()=> {
        let s = ''
        if (value < 51) {
            s = "0002";
            setValue(2);
        } else {
            const n = value - 50;
            if (n < 126) {
                s = n.toString().padStart(4, '0')
            } else {
                s = n.toString();
            }
            setValue(prevState => ( prevState -50))
        }
        fetchBooks(s);
    }

    useEffect(()=> {
        setLoading(true);
        // console.log(n);
        props.firebase
            .books()
            .orderByChild("callnumber")
            .startAt(2)
            .limitToFirst(10)
            .once("value")
            .then(snap => {
                const snapObject = snap.val()
                const snapList = Object.keys(snapObject).map(key => ({
                        ...snapObject[key],
                        book_id: key,
                    }))
                setList(snapList);
                setLoading(false);        
            })
            .catch(error => {
                setError(error);
            })     
    },[props.firebase])

   


    return (
        <div className="library-browser">
            <div className="browser__nav">
                <div className="nav-btn__container">
                    <ImBackward2 onClick={onFastBackward} className="nav-icon__double"/>
                    <div onClick={onBackward} className="nav-btn"> <GoTriangleLeft className="nav-icon"/> Wstecz</div>
                </div>
                <div className="browser__header" >Przeglądaj nasz katalog</div>
                <div className="nav-btn__container">
                    <div onClick={onForward} className="nav-btn">Dalej <GoTriangleRight className="nav-icon"/> </div>
                    <ImForward3 onClick={onFastForward} className="nav-icon__double"/>
                </div>
                
            </div>
            {loading && <div className="loading-msg">Ładujemy dane...</div>}
            <ul className="browser__list">
                {list.map(book => (
                    <li key={book.book_id} className="browser-list__item">
                        <Link to={`${ROUTES.MAIN}/${book.book_id}`} className="browser-item__link">
                            <div className="browser-item__content">
                                <span className="browser-content__number">{parseInt(book.callnumber.toString().slice(0,4))}</span>
                                <span className="browser-content__title content">{book.title}</span>
                                <span className="browser-content__author content">  Autorstwa: {book.author} </span>
                                <span className="browser-content__publisher content">Wydana: { book.publisher} </span>
                            </div>
                        </Link>
                    </li>
                ))}
            </ul>
            {error && <p className="error-message">{error.message}</p>}
        </div>
    )
}

export default withFirebase(LibraryBrowser);