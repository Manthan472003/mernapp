import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Card from '../components/Card';

export default function Home() {
  const [search, setSearch] = useState('');
  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);
  const [loading, setLoading] = useState(true); // State for loading indicator

  // Fetch food data
  const loadData = async () => {
    try {
      const response = await fetch('https://epiceatsbackend.vercel.app/api/foodData', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await response.json();
      setFoodItem(data[0] || []);
      setFoodCat(data[1] || []);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false); // Stop loading after data is fetched
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      <Navbar />
      {/* Carousel */}
      <div
        id="carouselExampleFade"
        className="carousel slide carousel-fade"
        data-bs-ride="carousel"
        style={{ objectFit: 'contain' }}
      >
        <div className="carousel-inner" id="carousel">
          <div className="carousel-caption" style={{ zIndex: 10 }}>
            <div className="d-flex justify-content-center">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button className="btn btn-outline-success text-white bg-success" type="submit">
                Search
              </button>
            </div>
          </div>
          {['burger', 'pizza', 'sandwich', 'friedrice'].map((food, index) => (
            <div
              key={food}
              className={`carousel-item ${index === 0 ? 'active' : ''}`}
            >
              <img
                src={`https://source.unsplash.com/random/900×700/?${food}`}
                className="d-block w-100"
                style={{ filter: 'brightness(30%)' }}
                alt={`Slide of ${food}`}
              />
            </div>
          ))}
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleFade"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleFade"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      {/* Food Categories */}
      <div className="container">
        {loading ? (
          <div className="text-center mt-5">
            <span className="spinner-border text-primary" role="status"></span>
            <p>Loading...</p>
          </div>
        ) : foodCat.length > 0 ? (
          foodCat.map((category) => (
            <div key={category._id} className="row mb-3">
              <div className="fs-3 m-3">{category.CategoryName}</div>
              <hr />
              {foodItem.length > 0 ? (
                foodItem
                  .filter(
                    (item) =>
                      item.CategoryName === category.CategoryName &&
                      item.name.toLowerCase().includes(search.toLowerCase())
                  )
                  .map((filteredItem) => (
                    <div key={filteredItem._id} className="col-12 col-md-6 col-lg-4">
                      <Card foodItem={filteredItem} options={filteredItem.options[0]} />
                    </div>
                  ))
              ) : (
                <div className="text-muted">No food items found</div>
              )}
            </div>
          ))
        ) : (
          <div className="text-center text-muted">No categories found</div>
        )}
      </div>

      <Footer />
    </div>
  );
}
