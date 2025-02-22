import React, { useState } from 'react';
import { Search, Clock, Star, MapPin, Filter, TrendingUp, Heart } from 'lucide-react';

const HomePage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [location, setLocation] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // Sample food items data
  const foodItems = [
    {
      id: 1,
      name: "Butter Chicken",
      restaurant: "Punjab Grill",
      category: "North Indian",
      rating: 4.5,
      deliveryTime: "30-35 min",
      price: 450,
      cuisine: "North Indian",
      offers: "50% off up to ₹100",
      veg: false,
      imageUrl: "https://thesassyfoodie.com/wp-content/uploads/2022/02/Shahi-Paneer-1.jpg"
    },
    {
      id: 2,
      name: "Margherita Pizza",
      restaurant: "Pizza Express",
      category: "Italian",
      rating: 4.3,
      deliveryTime: "40-45 min",
      price: 350,
      cuisine: "Italian",
      offers: "Free delivery",
      veg: true,
      imageUrl: "https://images.jdmagicbox.com/comp/def_content/pizza_outlets/default-pizza-outlets-13-250.jpg"
    },
    {
      id: 3,
      name: "Sushi Platter",
      restaurant: "Sakura Japanese",
      category: "Japanese",
      rating: 4.7,
      deliveryTime: "45-50 min",
      price: 850,
      cuisine: "Japanese",
      offers: "20% off on orders above ₹999",
      veg: false,
      imageUrl: "https://cdn.media.amplience.net/i/japancentre/guide-page-sushi-79-maki-sushi/guide-page-sushi-79-maki-sushi?$poi$&w=1400&sm=aspect&aspect=16:9&fmt=auto"
    }
  ];

  const categories = [
    { id: 'all', name: 'All', icon: <TrendingUp size={20} /> },
    { id: 'north-indian', name: 'North Indian', image: "/api/placeholder/40/40" },
    { id: 'south-indian', name: 'South Indian', image: "/api/placeholder/40/40" },
    { id: 'chinese', name: 'Chinese', image: "/api/placeholder/40/40" },
    { id: 'italian', name: 'Italian', image: "/api/placeholder/40/40" },
    { id: 'japanese', name: 'Japanese', image: "/api/placeholder/40/40" }
  ];

  // Zomato-inspired color theme
  const theme = {
    primary: '#E23744', // Zomato red
    secondary: '#1C1C1C',
    accent: '#FF7E8B',
    background: '#F8F8F8',
    text: {
      primary: '#1C1C1C',
      secondary: '#686B78',
      light: '#93959F'
    },
    success: '#60B246', // Success green
    warning: '#DB7C38', // Warning orange
  };

  const styles = {
    container: {
      minHeight: '100vh',
      backgroundColor: theme.background,
    },
    navbar: {
      position: 'sticky',
      top: 0,
      backgroundColor: 'white',
      padding: '16px 0',
      boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
      zIndex: 100
    },
    navContent: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 20px',
      display: 'flex',
      alignItems: 'center',
      gap: '24px'
    },
    logo: {
      fontSize: '24px',
      fontWeight: '700',
      color: theme.primary,
      cursor: 'pointer'
    },
    searchContainer: {
      flex: 1,
      display: 'flex',
      gap: '12px',
      maxWidth: '800px'
    },
    locationInput: {
      position: 'relative',
      width: '240px',
      display: 'flex',
      alignItems: 'center',
      backgroundColor: 'white',
      border: '1px solid #E8E8E8',
      borderRadius: '8px',
      padding: '8px 12px',
      gap: '8px'
    },
    searchInput: {
      flex: 1,
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      backgroundColor: 'white',
      border: '1px solid #E8E8E8',
      borderRadius: '8px',
      padding: '8px 12px',
      gap: '8px'
    },
    input: {
      border: 'none',
      outline: 'none',
      width: '100%',
      fontSize: '14px'
    },
    mainContent: {
      maxWidth: '1200px',
      margin: '32px auto',
      padding: '0 20px'
    },
    categoriesSection: {
      marginBottom: '40px'
    },
    categoriesGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
      gap: '16px',
      marginTop: '24px'
    },
    categoryCard: (isSelected) => ({
      backgroundColor: 'white',
      borderRadius: '12px',
      padding: '16px',
      textAlign: 'center',
      cursor: 'pointer',
      border: `2px solid ${isSelected ? theme.primary : 'transparent'}`,
      transition: 'all 0.2s ease',
      boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
    }),
    categoryImage: {
      width: '64px',
      height: '64px',
      borderRadius: '50%',
      marginBottom: '12px'
    },
    categoryName: {
      fontSize: '14px',
      fontWeight: '500',
      color: theme.text.primary
    },
    restaurantsSection: {
      marginTop: '40px'
    },
    sectionHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '24px'
    },
    sectionTitle: {
      fontSize: '24px',
      fontWeight: '600',
      color: theme.text.primary
    },
    filterButton: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      padding: '8px 16px',
      borderRadius: '8px',
      border: '1px solid #E8E8E8',
      backgroundColor: 'white',
      cursor: 'pointer'
    },
    restaurantsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
      gap: '24px'
    },
    restaurantCard: {
      backgroundColor: 'white',
      borderRadius: '16px',
      overflow: 'hidden',
      boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
      transition: 'all 0.3s ease'
    },
    imageContainer: {
      position: 'relative'
    },
    foodImage: {
      width: '100%',
      height: '200px',
      objectFit: 'cover'
    },
    offerTag: {
      position: 'absolute',
      bottom: '12px',
      left: '12px',
      backgroundColor: theme.primary,
      color: 'white',
      padding: '4px 8px',
      borderRadius: '4px',
      fontSize: '12px',
      fontWeight: '500'
    },
    wishlistButton: {
      position: 'absolute',
      top: '12px',
      right: '12px',
      backgroundColor: 'white',
      borderRadius: '50%',
      padding: '8px',
      cursor: 'pointer',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
    },
    restaurantInfo: {
      padding: '16px'
    },
    restaurantName: {
      fontSize: '18px',
      fontWeight: '600',
      marginBottom: '4px',
      color: theme.text.primary
    },
    cuisineText: {
      fontSize: '14px',
      color: theme.text.secondary,
      marginBottom: '12px'
    },
    metaContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '12px 0',
      borderTop: '1px solid #F0F0F0'
    },
    rating: {
      display: 'flex',
      alignItems: 'center',
      gap: '4px',
      backgroundColor: theme.success,
      color: 'white',
      padding: '4px 8px',
      borderRadius: '4px',
      fontSize: '14px',
      fontWeight: '500'
    },
    deliveryInfo: {
      display: 'flex',
      alignItems: 'center',
      gap: '4px',
      fontSize: '14px',
      color: theme.text.secondary
    }
  };

  return (
    <div style={styles.container}>
      <main style={styles.mainContent}>
        <section style={styles.categoriesSection}>
          <div style={styles.sectionHeader}>
            <h2 style={styles.sectionTitle}>What's on your mind?</h2>
          </div>
          <div style={styles.categoriesGrid}>
            {categories.map(category => (
              <div
                key={category.id}
                style={styles.categoryCard(selectedCategory === category.id)}
                onClick={() => setSelectedCategory(category.id)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'none';
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.04)';
                }}
              >
                {category.icon || (
                  <img
                    src={category.image}
                    alt={category.name}
                    style={styles.categoryImage}
                  />
                )}
                <div style={styles.categoryName}>{category.name}</div>
              </div>
            ))}
          </div>
        </section>

        <section style={styles.restaurantsSection}>
          <div style={styles.sectionHeader}>
            <h2 style={styles.sectionTitle}>Best Food in Your Area</h2>
            <button style={styles.filterButton}>
              <Filter size={20} />
              <span>Filters</span>
            </button>
          </div>
          <div style={styles.restaurantsGrid}>
            {foodItems.map(item => (
              <div
                key={item.id}
                style={styles.restaurantCard}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'none';
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.06)';
                }}
              >
                <div style={styles.imageContainer}>
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    style={styles.foodImage}
                  />
                  <div style={styles.offerTag}>{item.offers}</div>
                  <div style={styles.wishlistButton}>
                    <Heart size={20} color={theme.text.light} />
                  </div>
                </div>
                <div style={styles.restaurantInfo}>
                  <h3 style={styles.restaurantName}>{item.restaurant}</h3>
                  <p style={styles.cuisineText}>{item.cuisine}</p>
                  <div style={styles.metaContainer}>
                    <div style={styles.rating}>
                      <Star size={16} />
                      <span>{item.rating}</span>
                    </div>
                    <div style={styles.deliveryInfo}>
                      <Clock size={16} />
                      <span>{item.deliveryTime}</span>
                    </div>
                    <div style={styles.deliveryInfo}>₹{item.price} for two</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default HomePage;