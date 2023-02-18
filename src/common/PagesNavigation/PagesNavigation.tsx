import React, { FC } from 'react';
import s from './PagesNavigation.module.css';

type PropsType = {
    totalUsersCount: number
    pageSize: number
    pageNumber: number
    onPageChange: (pageNum: number) => void
}
// Creating a bar of page numbers with limits from the left and right sides
const PagesNavigation: FC<PropsType> = (props) => {

    // calculat and round the total amount of pages and create an array of all page numbers
    let pagesCount = Math.ceil(props.totalUsersCount/props.pageSize);
    let pages: Array<number> = [];
    for (let i=1; i<=pagesCount ; i++) {
        pages.push(i);
    }

    // show 9 page numbers in the bar in accordance to the current one (+/- 4)
    let curPage=props.pageNumber;
    let curPageFirst=((curPage-5)<0) ? 0 : curPage-5;       // first nubmber of the bar
    let curPageLast=curPage+4;                              // last nubmber of the bar
    let slicedPages=pages.slice(curPageFirst, curPageLast)
    return (
        <div>
            {slicedPages.map ( p => {
                return <span key={p} onClick={() => { props.onPageChange(p)}} className={p===props.pageNumber ? s.selectedPage : s.ordinaryPage}> {p} </span>
            })}
        </div>)
}
export default PagesNavigation;