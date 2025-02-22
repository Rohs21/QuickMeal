import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin, ChevronDown, Truck, User } from 'lucide-react';

const TopBar = () => {
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [location, setLocation] = useState('Bangalore');

  const theme = {
    primary: '#E23744',
    secondary: '#1C1C1C',
    background: '#FFFFFF',
    text: {
      primary: '#1C1C1C',
      secondary: '#686B78',
      light: '#93959F'
    }
  };

  const styles = {
    topBarSection: {
      display: 'flex',
      alignItems: 'center',
      padding: '16px 48px',
      backgroundColor: theme.background,
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      gap: '32px'
    },
    logo: {
      textDecoration: 'none',
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    },
    logoText: {
      color: theme.primary,
      fontSize: '28px',
      fontWeight: '700',
      margin: 0,
      letterSpacing: '-0.5px'
    },
    searchSection: {
      flex: 1,
      display: 'flex',
      alignItems: 'center',
      gap: '16px',
      maxWidth: '800px'
    },
    locationSelector: {
      position: 'relative',
      minWidth: '240px'
    },
    locationButton: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      padding: '12px 16px',
      borderRadius: '8px',
      border: '1px solid #E8E8E8',
      backgroundColor: 'white',
      cursor: 'pointer',
      width: '100%',
      transition: 'all 0.2s ease'
    },
    locationIcon: {
      color: theme.primary
    },
    locationText: {
      flex: 1,
      fontSize: '15px',
      color: theme.text.primary,
      textAlign: 'left'
    },
    searchContainer: {
      flex: 1,
      position: 'relative'
    },
    searchWrapper: {
      display: 'flex',
      alignItems: 'center',
      border: '1px solid #E8E8E8',
      borderRadius: '8px',
      padding: '12px 16px',
      gap: '12px',
      backgroundColor: 'white',
      transition: 'all 0.2s ease'
    },
    searchIcon: {
      color: theme.text.light
    },
    searchInput: {
      border: 'none',
      outline: 'none',
      width: '100%',
      fontSize: '15px',
      color: theme.text.primary,
      '::placeholder': {
        color: theme.text.light
      }
    },
    navLinks: {
      display: 'flex',
      alignItems: 'center',
      gap: '24px'
    },
    navLink: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      color: theme.text.secondary,
      textDecoration: 'none',
      fontSize: '15px',
      fontWeight: '500',
      padding: '8px 12px',
      borderRadius: '8px',
      transition: 'all 0.2s ease'
    },
    orderButton: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      padding: '10px 20px',
      backgroundColor: theme.primary,
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      fontSize: '15px',
      fontWeight: '500',
      transition: 'all 0.2s ease'
    },
    locationDropdown: {
      position: 'absolute',
      top: '100%',
      left: 0,
      right: 0,
      marginTop: '8px',
      backgroundColor: 'white',
      borderRadius: '8px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
      border: '1px solid #E8E8E8',
      padding: '8px 0',
      display: isLocationOpen ? 'block' : 'none'
    },
    locationOption: {
      padding: '12px 16px',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      fontSize: '14px',
      color: theme.text.primary
    }
  };

  const popularLocations = [
    'Bangalore', 'Mumbai', 'Delhi', 'Hyderabad', 'Chennai'
  ];

  return (
    <section style={styles.topBarSection}>
      <Link to="/" style={styles.logo}>
        <h1 style={styles.logoText}>QuickMeal</h1>
      </Link>

      <div style={styles.searchSection}>
        <div style={styles.locationSelector}>
          <button
            style={styles.locationButton}
            onClick={() => setIsLocationOpen(!isLocationOpen)}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = theme.primary;
              e.currentTarget.style.boxShadow = '0 0 0 3px rgba(226, 55, 68, 0.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = '#E8E8E8';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <MapPin size={18} style={styles.locationIcon} />
            <span style={styles.locationText}>{location}</span>
            <ChevronDown size={18} color={theme.text.light} />
          </button>

          <div style={styles.locationDropdown}>
            {popularLocations.map((loc) => (
              <div
                key={loc}
                style={styles.locationOption}
                onClick={() => {
                  setLocation(loc);
                  setIsLocationOpen(false);
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#F8F8F8';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                {loc}
              </div>
            ))}
          </div>
        </div>

        <div style={styles.searchContainer}>
          <div 
            style={styles.searchWrapper}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = theme.primary;
              e.currentTarget.style.boxShadow = '0 0 0 3px rgba(226, 55, 68, 0.1)';
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = '#E8E8E8';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <Search size={18} style={styles.searchIcon} />
            <input
              type="text"
              placeholder="Search for restaurant, cuisine or a dish"
              style={styles.searchInput}
            />
          </div>
        </div>
      </div>

      <div style={styles.navLinks}>
        <Link 
          to="/orders"
          style={styles.navLink}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#F8F8F8';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
          }}
        >
          <Truck size={18} />
          <span>Orders</span>
        </Link>

        <Link 
          to="/login" 
          style={styles.navLink}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#F8F8F8';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
          }}
        >
          <User size={18} />
          <span>Sign In</span>
        </Link>

        <button 
          style={styles.orderButton}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#D32F3C';
            e.currentTarget.style.transform = 'translateY(-1px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = theme.primary;
            e.currentTarget.style.transform = 'none';
          }}
        >
          Order Now
        </button>
      </div>
    </section>
  );
};

export default TopBar;