import React from 'react';
import "./cardStyle.css"
import {Link} from 'react-router-dom';

const StatsCards =()=>(

<div class="main-container">

<div class="cards">
  <div class="card card-1">
    <div class="card__icon"><i class="fas fa-bolt"></i></div>
    <p class="card__exit"><i class="fas fa-times"></i></p>
    <h2 class="card__title">Green Category</h2>
    <h2 class="card__title">Less Than 20%</h2>
    <p class="card__apply">
    <Link to="/admin/greenstats" class="card__link">View </Link>
      <Link to="#" class="card__link">Download</Link>
    </p>
  </div>
  <div class="card card-2">
    <div class="card__icon"><i class="fas fa-bolt"></i></div>
    <p class="card__exit"><i class="fas fa-times"></i></p>
    <h2 class="card__title">Yellow Category</h2>
    <h2 class="card__title">20% To 50%</h2>
    <p class="card__apply">
      <Link to="/admin/yellowstats" class="card__link">View </Link>
      <Link to="#" class="card__link">Download</Link>
    </p>
  </div>
  <div class="card card-3">
    <div class="card__icon"><i class="fas fa-bolt"></i></div>
    <p class="card__exit"><i class="fas fa-times"></i></p>
    <h2 class="card__title">Red Category</h2>
    <h2 class="card__title">More Than 50%</h2>
    <p class="card__apply">
    <Link to="/admin/redstats" class="card__link">View </Link>
      <Link to="/admin/pdf" class="card__link">Download</Link>
    </p>
  </div>

</div>
</div>

);
export default StatsCards;
