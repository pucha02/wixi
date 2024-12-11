import { NameCategory } from "../../atoms/Category/NameField";
import { useEffect, useMemo, useState } from "react";
import useGetDataCategories from "../../../../services/FetchDataCategory";
import { Link } from "react-router-dom";

import './CategoryList.css';

import Filter from "../../organisms/Filter/Filter";


const CategoryList = ({setViewCategories, overlayVisible, setOverlayVisible}) => {
  const [categories, setCategories] = useState([]);

  const { getAllCategories } = useGetDataCategories();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getAllCategories();
        setCategories(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  function renderItems(arr) {
    const items = arr.map((item, i) => {
      return (
        <Link key={i} state={{ title: item.title }} to={`/category/productList/${item.title}`} >
          <li className="name-category" onClick={() => {
            setViewCategories(false);
              // Показываем оверлей при клике
          }}>
            <NameCategory name={item.title} />
          </li>
        </Link>
      );
    });
    return <ul className="category-list-ul">{items}</ul>;
  }

  const elements = useMemo(() => {
    return renderItems(categories);
  }, [categories]);

  return (
    <div className="category-list-block">
      <div className="category-list">
        <h3>Категорії</h3> 
        {/* <div className="category-list-close" onClick={()=>setViewCategories(false)}>&times;</div> */}
        <div className="categories">
          {elements}
        </div>
      </div>
      {/* Оверлей */}
      <div className={`overlay ${overlayVisible ? 'visible' : ''}`} onClick={() => {setOverlayVisible(false); setViewCategories(false)}} />
    </div>
  )
};

export default CategoryList