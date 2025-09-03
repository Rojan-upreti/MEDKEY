import React, { useState, useEffect, useCallback } from 'react';
import { 
  Search, 
  MapPin, 
  Phone
} from 'lucide-react';
import LoadingAnimation from './LoadingAnimation';

const FindDoctor = () => {
  // Find Doctor state
  const [searchData, setSearchData] = useState({
    firstName: '',
    lastName: '',
    organizationName: '',
    city: '',
    state: '',
    postalCode: ''
  });
  const [searchResults, setSearchResults] = useState(null);
  const [filteredResults, setFilteredResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [hasResults, setHasResults] = useState(false);
  const [error, setError] = useState(null);
  const [locationLoading, setLocationLoading] = useState(false);
  
  // Filter state
  const [selectedTaxonomy, setSelectedTaxonomy] = useState('');
  const [sortBy, setSortBy] = useState('relevance');

  const handleInputChange = (field, value) => {
    setSearchData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSortChange = (value) => {
    setSortBy(value);
  };

  // Get user's precise location and convert to ZIP code
  const getCurrentLocation = async () => {
    setLocationLoading(true);
    setError(null);
    
    try {
      if (!navigator.geolocation) {
        throw new Error('Geolocation is not supported by your browser');
      }

      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 15000,
          maximumAge: 30000
        });
      });

      const { latitude, longitude } = position.coords;
      
      const response = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`);
      
      if (!response.ok) {
        throw new Error('Could not convert location to ZIP code');
      }
      
      const locationData = await response.json();
      const zipCode = locationData.postcode;
      
      if (!zipCode) {
        throw new Error('ZIP code not found for your location');
      }

      setSearchData(prev => ({
        ...prev,
        postalCode: zipCode
      }));

      setTimeout(() => {
        searchProviders();
      }, 500);
      
    } catch (error) {
      console.error('Location access error:', error);
      if (error.code === 1) {
        setError('Location access denied. Please enable location access in your browser settings.');
      } else if (error.code === 2) {
        setError('Location unavailable. Please check your device location settings.');
      } else if (error.code === 3) {
        setError('Location request timed out. Please try again.');
      } else {
        setError('Could not get your location. Please enter your ZIP code manually.');
      }
    } finally {
      setLocationLoading(false);
    }
  };

  // Generate nearby ZIP codes
  const generateNearbyZipCodes = (zipCode) => {
    const cleanZipCode = zipCode.toString().replace(/\D/g, '').slice(0, 5).padStart(5, '0');
    
    if (!cleanZipCode || cleanZipCode.length !== 5 || cleanZipCode === '00000') {
      return [zipCode];
    }
    
    const zipNum = parseInt(cleanZipCode);
    if (isNaN(zipNum) || zipNum <= 0) {
      return [zipCode];
    }
    
    const nearbyZips = [];
    nearbyZips.push(cleanZipCode);
    
    for (let i = 1; i <= 4; i++) {
      const ascendingZip = (zipNum + i).toString().padStart(5, '0');
      if (ascendingZip.length === 5 && parseInt(ascendingZip) <= 99999) {
        nearbyZips.push(ascendingZip);
      }
      
      const descendingZip = (zipNum - i).toString().padStart(5, '0');
      if (descendingZip.length === 5 && parseInt(descendingZip) > 0) {
        nearbyZips.push(descendingZip);
      }
    }
    
    return nearbyZips;
  };

  const searchProviders = async () => {
    setLoading(true);
    setError(null);
    setHasResults(false);
    
    try {
      const hasFirstName = searchData.firstName && searchData.firstName.trim();
      const hasLastName = searchData.lastName && searchData.lastName.trim();
      const hasOrganization = searchData.organizationName && searchData.organizationName.trim();
      const hasCity = searchData.city && searchData.city.trim();
      const hasState = searchData.state && searchData.state.trim();
      const hasPostalCode = searchData.postalCode && searchData.postalCode.trim();
      
      const filledFields = [hasFirstName, hasLastName, hasOrganization, hasCity, hasState, hasPostalCode].filter(Boolean);
      
      if (hasState && filledFields.length === 1) {
        setError('Please enter at least one additional search field along with the state.');
        setLoading(false);
        return;
      }
      
      if (filledFields.length === 0) {
        setError('Please enter at least one search criterion.');
        setLoading(false);
        return;
      }

      let allResults = { results: [], result_count: 0 };
      const searchedZipCodes = [];

      if (hasPostalCode) {
        const cleanZipCode = searchData.postalCode.trim().replace(/\D/g, '').slice(0, 5);
        
        if (cleanZipCode.length !== 5 || isNaN(parseInt(cleanZipCode)) || parseInt(cleanZipCode) <= 0) {
          setError('Please enter a valid 5-digit ZIP code.');
          setLoading(false);
          return;
        }
        
        const nearbyZipCodes = generateNearbyZipCodes(cleanZipCode);
        searchedZipCodes.push(...nearbyZipCodes);
        
        setSearchResults({ results: [], result_count: 0, searchedZipCodes });
        setFilteredResults({ results: [], result_count: 0 });
        
        for (const zipCode of nearbyZipCodes) {
          const params = new URLSearchParams({
            version: '2.1',
            country_code: 'US',
            limit: '200',
            postal_code: zipCode
          });

          if (hasFirstName) params.append('first_name', searchData.firstName.trim());
          if (hasLastName) params.append('last_name', searchData.lastName.trim());
          if (hasOrganization) {
            const orgSearchTerm = searchData.organizationName.trim();
            params.append('organization_name', orgSearchTerm);
          }
          if (hasCity) params.append('city', searchData.city.trim());
          if (hasState) {
            const stateCode = searchData.state.trim().toUpperCase();
            if (stateCode.length === 2) {
              params.append('state', stateCode);
            }
          }

          const apiUrl = `https://npiregistry.cms.hhs.gov/api/?${params.toString()}`;
          
          const corsProxies = [
            'https://api.allorigins.win/raw?url=',
            'https://corsproxy.io/?',
            'https://cors-proxy.htmldriven.com/?url='
          ];
          
          let response;
          
          for (const proxy of corsProxies) {
            try {
              response = await fetch(`${proxy}${encodeURIComponent(apiUrl)}`);
              if (response.ok) {
                break;
              }
            } catch (err) {
              continue;
            }
          }

          if (response && response.ok) {
            try {
              const data = await response.json();
              if (data.results && data.results.length > 0) {
                const cleanedResults = data.results.map(result => {
                  const cleanedAddresses = result.addresses.map(address => ({
                    ...address,
                    postal_code: address.postal_code ? address.postal_code.toString().replace(/\D/g, '').slice(0, 5) : address.postal_code
                  }));
                  
                  return {
                    ...result,
                    addresses: cleanedAddresses,
                    searchedZipCode: zipCode
                  };
                });
                
                allResults.results.push(...cleanedResults);
                
                const currentResults = {
                  ...allResults,
                  searchedZipCodes
                };
                
                const uniqueResults = currentResults.results.filter((result, index, self) => 
                  index === self.findIndex(r => r.number === result.number)
                );
                
                const updatedResults = {
                  ...currentResults,
                  results: uniqueResults,
                  result_count: uniqueResults.length
                };
                
                setSearchResults(updatedResults);
                setFilteredResults(applyFilters(updatedResults));
                setHasResults(true);
              }
            } catch (parseError) {
              console.error(`Error parsing response for ZIP ${zipCode}:`, parseError);
            }
          }
        }
      } else {
        const params = new URLSearchParams({
          version: '2.1',
          country_code: 'US',
          limit: '200'
        });

        if (hasFirstName) params.append('first_name', searchData.firstName.trim());
        if (hasLastName) params.append('last_name', searchData.lastName.trim());
        if (hasOrganization) {
          const orgSearchTerm = searchData.organizationName.trim();
          params.append('organization_name', orgSearchTerm);
        }
        if (hasCity) params.append('city', searchData.city.trim());
        if (hasState) {
          const stateCode = searchData.state.trim().toUpperCase();
          if (stateCode.length === 2) {
            params.append('state', stateCode);
          }
        }

        const apiUrl = `https://npiregistry.cms.hhs.gov/api/?${params.toString()}`;
        
        const corsProxies = [
          'https://api.allorigins.win/raw?url=',
          'https://corsproxy.io/?',
          'https://cors-proxy.htmldriven.com/?url='
        ];
        
        let response;
        
        for (const proxy of corsProxies) {
          try {
            response = await fetch(`${proxy}${encodeURIComponent(apiUrl)}`);
            if (response.ok) {
              break;
            }
          } catch (err) {
            continue;
          }
        }

        if (!response || !response.ok) {
          throw new Error('All CORS proxies failed. Please try again.');
        }
        
        try {
          const data = await response.json();
          
          if (data.results && data.results.length > 0) {
            const cleanedResults = data.results.map(result => {
              const cleanedAddresses = result.addresses.map(address => ({
                ...address,
                postal_code: address.postal_code ? address.postal_code.toString().replace(/\D/g, '').slice(0, 5) : address.postal_code
              }));
              
              return {
                ...result,
                addresses: cleanedAddresses
              };
            });
            
            allResults = {
              ...data,
              results: cleanedResults
            };
            
            setHasResults(true);
          } else {
            allResults = data;
          }
        } catch (parseError) {
          console.error('Error parsing API response:', parseError);
          throw new Error('Invalid response from server. Please check your search criteria.');
        }
      }

      let uniqueResults = allResults.results.filter((result, index, self) => 
        index === self.findIndex(r => r.number === result.number)
      );

      let finalResults = {
        ...allResults,
        results: uniqueResults,
        result_count: uniqueResults.length
      };

      if (searchedZipCodes.length > 0) {
        finalResults.searchedZipCodes = searchedZipCodes;
      }

      if (finalResults.result_count === 0) {
        setError('No providers found. Please try different search criteria.');
        setHasResults(false);
      } else {
        setError(null);
        setHasResults(true);
      }

      setSearchResults(finalResults);
      setFilteredResults(applyFilters(finalResults));
      setSelectedTaxonomy('');
    } catch (err) {
      console.error('Search error:', err);
      
      if (err.message.includes('CORS') || err.message.includes('fetch') || err.message.includes('network')) {
        setError('Network error. Please check your internet connection and try again.');
      } else {
        setError(err.message || 'Search failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleTaxonomyFilter = (taxonomy) => {
    setSelectedTaxonomy(taxonomy);
  };

  const formatPhone = (phone) => {
    if (!phone) return 'Not available';
    const digits = phone.replace(/\D/g, '');
    if (digits.length === 10) {
      return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
    }
    return phone;
  };

  const getProviderName = (provider) => {
    if (provider.enumeration_type === 'NPI-2') {
      return provider.basic.organization_name || 'Organization';
    } else {
      const parts = [
        provider.basic.first_name,
        provider.basic.middle_name,
        provider.basic.last_name
      ].filter(Boolean);
      const name = parts.join(' ');
      const credential = provider.basic.credential;
      return credential ? `${name}, ${credential}` : name;
    }
  };

  const getPrimaryTaxonomy = (taxonomies) => {
    const primary = taxonomies.find(tax => tax.primary);
    return primary || taxonomies[0];
  };

  const getUniqueTaxonomies = (results) => {
    if (!results || !results.results) return [];
    
    const taxonomies = new Set();
    results.results.forEach(provider => {
      provider.taxonomies.forEach(tax => {
        taxonomies.add(tax.desc);
      });
    });
    
    return Array.from(taxonomies).sort();
  };

  const applyFilters = useCallback((results) => {
    if (!results || !results.results) return results;
    
    let filtered = [...results.results];
    
    if (selectedTaxonomy) {
      filtered = filtered.filter(provider => 
        provider.taxonomies.some(tax => tax.desc === selectedTaxonomy)
      );
    }
    
    if (sortBy === 'name') {
      filtered.sort((a, b) => {
        const nameA = getProviderName(a).toLowerCase();
        const nameB = getProviderName(b).toLowerCase();
        return nameA.localeCompare(nameB);
      });
    }
    
    return {
      ...results,
      results: filtered,
      result_count: filtered.length
    };
  }, [selectedTaxonomy, sortBy]);

  useEffect(() => {
    if (searchResults) {
      setFilteredResults(applyFilters(searchResults));
    }
  }, [selectedTaxonomy, sortBy, searchResults, applyFilters]);

  return (
    <div>
      {/* Search Section */}
      <div className="card" style={{marginBottom: '24px'}}>
        <div className="card-header">
          <Search className="card-icon" />
          <h3 className="card-title">Search Healthcare Providers</h3>
        </div>
        <div className="card-content">
          <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px'}}>
            <div>
              <label style={{display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500', color: '#374151'}}>
                First Name
              </label>
              <input 
                type="text" 
                placeholder="Enter first name"
                value={searchData.firstName}
                onChange={(e) => handleInputChange('firstName', e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  fontSize: '14px'
                }}
              />
            </div>
            <div>
              <label style={{display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500', color: '#374151'}}>
                Last Name
              </label>
              <input 
                type="text" 
                placeholder="Enter last name"
                value={searchData.lastName}
                onChange={(e) => handleInputChange('lastName', e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  fontSize: '14px'
                }}
              />
            </div>
          </div>
          
          <div style={{marginBottom: '16px'}}>
            <label style={{display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500', color: '#374151'}}>
              Organization Name
            </label>
            <input 
              type="text" 
              placeholder="Enter organization name"
              value={searchData.organizationName}
              onChange={(e) => handleInputChange('organizationName', e.target.value)}
              style={{
                width: '100%',
                padding: '8px 12px',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                fontSize: '14px'
              }}
            />
          </div>
          
          <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px', marginBottom: '16px'}}>
            <div>
              <label style={{display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500', color: '#374151'}}>
                City
              </label>
              <input 
                type="text" 
                placeholder="Enter city"
                value={searchData.city}
                onChange={(e) => handleInputChange('city', e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  fontSize: '14px'
                }}
              />
            </div>
            <div>
              <label style={{display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500', color: '#374151'}}>
                State
              </label>
              <select
                value={searchData.state}
                onChange={(e) => handleInputChange('state', e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  fontSize: '14px',
                  backgroundColor: '#ffffff'
                }}
              >
                <option value="">Any State</option>
                <option value="AL">Alabama</option>
                <option value="AK">Alaska</option>
                <option value="AZ">Arizona</option>
                <option value="AR">Arkansas</option>
                <option value="CA">California</option>
                <option value="CO">Colorado</option>
                <option value="CT">Connecticut</option>
                <option value="DE">Delaware</option>
                <option value="FL">Florida</option>
                <option value="GA">Georgia</option>
                <option value="HI">Hawaii</option>
                <option value="ID">Idaho</option>
                <option value="IL">Illinois</option>
                <option value="IN">Indiana</option>
                <option value="IA">Iowa</option>
                <option value="KS">Kansas</option>
                <option value="KY">Kentucky</option>
                <option value="LA">Louisiana</option>
                <option value="ME">Maine</option>
                <option value="MD">Maryland</option>
                <option value="MA">Massachusetts</option>
                <option value="MI">Michigan</option>
                <option value="MN">Minnesota</option>
                <option value="MS">Mississippi</option>
                <option value="MO">Missouri</option>
                <option value="MT">Montana</option>
                <option value="NE">Nebraska</option>
                <option value="NV">Nevada</option>
                <option value="NH">New Hampshire</option>
                <option value="NJ">New Jersey</option>
                <option value="NM">New Mexico</option>
                <option value="NY">New York</option>
                <option value="NC">North Carolina</option>
                <option value="ND">North Dakota</option>
                <option value="OH">Ohio</option>
                <option value="OK">Oklahoma</option>
                <option value="OR">Oregon</option>
                <option value="PA">Pennsylvania</option>
                <option value="RI">Rhode Island</option>
                <option value="SC">South Carolina</option>
                <option value="SD">South Dakota</option>
                <option value="TN">Tennessee</option>
                <option value="TX">Texas</option>
                <option value="UT">Utah</option>
                <option value="VT">Vermont</option>
                <option value="VA">Virginia</option>
                <option value="WA">Washington</option>
                <option value="WV">West Virginia</option>
                <option value="WI">Wisconsin</option>
                <option value="WY">Wyoming</option>
              </select>
            </div>
            <div>
              <label style={{display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500', color: '#374151'}}>
                ZIP Code
              </label>
              <div style={{display: 'flex', gap: '8px'}}>
                <input 
                  type="text" 
                  placeholder="12345"
                  maxLength="5"
                  value={searchData.postalCode}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, '').slice(0, 5);
                    handleInputChange('postalCode', value);
                  }}
                  style={{
                    flex: '1',
                    padding: '8px 12px',
                    border: '1px solid #d1d5db',
                    borderRadius: '6px',
                    fontSize: '14px'
                  }}
                />
                <button
                  type="button"
                  onClick={getCurrentLocation}
                  disabled={locationLoading}
                  style={{
                    padding: '8px 12px',
                    backgroundColor: '#3b82f6',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: locationLoading ? 'not-allowed' : 'pointer',
                    fontSize: '14px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    opacity: locationLoading ? 0.6 : 1,
                    whiteSpace: 'nowrap',
                    minWidth: 'fit-content'
                  }}
                  title="Use my current location"
                >
                  <MapPin size={14} />
                  {locationLoading ? 'Locating...' : 'Locate Me'}
                </button>
              </div>
              <div style={{fontSize: '12px', color: '#6b7280', marginTop: '4px'}}>
                Will search nearby ZIP codes automatically
              </div>
            </div>
          </div>
          
          <div style={{display: 'flex', gap: '12px'}}>
            <button 
              className="button button-primary"
              style={{
                flex: '1',
                position: 'relative',
                overflow: 'hidden'
              }}
              onClick={searchProviders}
              disabled={loading}
            >
              <Search size={16} style={{marginRight: '8px'}} />
              {loading ? 'Searching...' : 'Search Providers'}
            </button>
          </div>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="card" style={{marginBottom: '24px', backgroundColor: '#fef2f2', borderColor: '#fecaca'}}>
          <div className="card-content">
            <div style={{color: '#dc2626', fontSize: '14px'}}>
              <strong>Error:</strong> {error}
            </div>
          </div>
        </div>
      )}

      {/* Loading Animation */}
      {loading && !hasResults && (
        <div className="card" style={{marginBottom: '24px'}}>
          <LoadingAnimation 
            message="Searching for healthcare providers in your area..."
            type="doctor"
          />
        </div>
      )}

      {/* Results Section - Structured Table */}
      {searchResults && searchResults.results && searchResults.results.length > 0 && (
        <div>
          <div className="card" style={{marginBottom: '16px'}}>
            <div className="card-content">
              <div style={{fontSize: '16px', fontWeight: '600', color: '#374151', marginBottom: '8px'}}>
                Search Results
              </div>
              <div style={{fontSize: '14px', color: '#6b7280', marginBottom: '16px'}}>
                Found {searchResults.result_count} providers
                {filteredResults && filteredResults.result_count !== searchResults.result_count && (
                  <span> • Showing {filteredResults.result_count} after filters</span>
                )}
              </div>

              {/* Filters */}
              <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', paddingTop: '16px', borderTop: '1px solid #e5e7eb'}}>
                <div>
                  <label style={{display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500', color: '#374151'}}>
                    Filter by Specialty
                  </label>
                  <select
                    value={selectedTaxonomy}
                    onChange={(e) => handleTaxonomyFilter(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      border: '1px solid #d1d5db',
                      borderRadius: '6px',
                      fontSize: '14px'
                    }}
                  >
                    <option value="">All Specialties</option>
                    {getUniqueTaxonomies(searchResults).map((taxonomy, index) => (
                      <option key={index} value={taxonomy}>
                        {taxonomy}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label style={{display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500', color: '#374151'}}>
                    Sort by
                  </label>
                  <select
                    value={sortBy}
                    onChange={(e) => handleSortChange(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      border: '1px solid #d1d5db',
                      borderRadius: '6px',
                      fontSize: '14px'
                    }}
                  >
                    <option value="relevance">Relevance</option>
                    <option value="name">Name (A-Z)</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-content" style={{padding: '0'}}>
              <div style={{overflowX: 'auto'}}>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
                  gap: '16px',
                  padding: '16px'
                }}>
                  {(filteredResults || searchResults).results && (filteredResults || searchResults).results.map((provider, index) => {
                    const primaryAddress = provider.addresses.find(addr => addr.address_purpose === 'LOCATION') || provider.addresses[0];
                    const primaryTaxonomy = getPrimaryTaxonomy(provider.taxonomies);
                    const otherTaxonomies = provider.taxonomies.filter(tax => !tax.primary);
                    
                    return (
                      <div key={provider.number} style={{
                        border: '1px solid #e5e7eb',
                        borderRadius: '12px',
                        padding: '20px',
                        backgroundColor: '#ffffff',
                        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
                        transition: 'all 0.2s ease-in-out',
                        cursor: 'pointer'
                      }} onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-2px)';
                        e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
                      }} onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)';
                      }}>
                        {/* Header */}
                        <div style={{marginBottom: '16px'}}>
                          <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'flex-start',
                            marginBottom: '8px'
                          }}>
                            <div style={{flex: 1}}>
                              <h3 style={{
                                fontSize: '16px',
                                fontWeight: '700',
                                color: '#1f2937',
                                margin: '0 0 4px 0',
                                lineHeight: '1.4'
                              }}>
                                {getProviderName(provider)}
                              </h3>
                              <div style={{
                                fontSize: '12px',
                                color: '#6b7280',
                                marginBottom: '4px'
                              }}>
                                {provider.enumeration_type === 'NPI-1' ? 'Individual Provider' : 'Organization'}
                              </div>
                              <div style={{
                                fontSize: '11px',
                                fontFamily: 'monospace',
                                color: '#9ca3af',
                                backgroundColor: '#f3f4f6',
                                padding: '2px 6px',
                                borderRadius: '4px',
                                display: 'inline-block',
                                marginRight: '8px'
                              }}>
                                NPI: {provider.number}
                              </div>
                              {provider.searchedZipCode && searchResults.searchedZipCodes && searchResults.searchedZipCodes.length > 1 && (
                                <div style={{
                                  fontSize: '11px',
                                  color: '#059669',
                                  backgroundColor: '#d1fae5',
                                  padding: '2px 6px',
                                  borderRadius: '4px',
                                  display: 'inline-block',
                                  fontWeight: '600'
                                }}>
                                  ZIP: {provider.searchedZipCode}
                                </div>
                              )}
                            </div>
                            <span style={{
                              fontSize: '11px',
                              fontWeight: '600',
                              color: provider.basic.status === 'A' ? '#059669' : '#dc2626',
                              backgroundColor: provider.basic.status === 'A' ? '#d1fae5' : '#fee2e2',
                              padding: '4px 8px',
                              borderRadius: '6px',
                              textTransform: 'uppercase'
                            }}>
                              {provider.basic.status === 'A' ? 'Active' : 'Inactive'}
                            </span>
                          </div>
                        </div>

                        {/* Contact Information */}
                        <div style={{marginBottom: '16px'}}>
                          {primaryAddress?.telephone_number && (
                            <div style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '8px',
                              marginBottom: '8px'
                            }}>
                              <Phone size={14} style={{color: '#6b7280', flexShrink: 0}} />
                              <div style={{flex: 1}}>
                                <div style={{
                                  fontSize: '14px',
                                  fontWeight: '600',
                                  color: '#1f2937',
                                  whiteSpace: 'nowrap',
                                  overflow: 'hidden',
                                  textOverflow: 'ellipsis'
                                }}>
                                  {formatPhone(primaryAddress.telephone_number)}
                                </div>
                                <a
                                  href={`tel:${primaryAddress.telephone_number}`}
                                  style={{
                                    fontSize: '12px',
                                    color: '#059669',
                                    textDecoration: 'none',
                                    fontWeight: '500',
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '4px'
                                  }}
                                >
                                  Call Now
                                </a>
                              </div>
                            </div>
                          )}

                          {primaryAddress && (
                            <div style={{
                              display: 'flex',
                              alignItems: 'flex-start',
                              gap: '8px'
                            }}>
                              <MapPin size={14} style={{color: '#6b7280', flexShrink: 0, marginTop: '2px'}} />
                              <div style={{flex: 1}}>
                                <div style={{
                                  fontSize: '14px',
                                  color: '#1f2937',
                                  lineHeight: '1.4',
                                  marginBottom: '8px'
                                }}>
                                  <div>{primaryAddress.address_1}</div>
                                  {primaryAddress.address_2 && <div>{primaryAddress.address_2}</div>}
                                  <div>{primaryAddress.city}, {primaryAddress.state} {primaryAddress.postal_code}</div>
                                </div>
                                <a
                                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${primaryAddress.address_1} ${primaryAddress.address_2 || ''} ${primaryAddress.city}, ${primaryAddress.state} ${primaryAddress.postal_code}`)}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  style={{
                                    fontSize: '12px',
                                    color: '#2563eb',
                                    textDecoration: 'none',
                                    fontWeight: '500',
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '4px'
                                  }}
                                >
                                  Get Directions
                                </a>
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Taxonomies */}
                        <div>
                          {primaryTaxonomy && (
                            <div style={{marginBottom: '8px'}}>
                              <div style={{
                                fontSize: '11px',
                                fontWeight: '700',
                                color: '#92400e',
                                backgroundColor: '#fef3c7',
                                padding: '4px 8px',
                                borderRadius: '6px',
                                display: 'inline-block',
                                textTransform: 'uppercase'
                              }}>
                                Primary: {primaryTaxonomy.desc}
                              </div>
                            </div>
                          )}
                          {otherTaxonomies.length > 0 && (
                            <div style={{
                              fontSize: '12px',
                              color: '#6b7280',
                              lineHeight: '1.4'
                            }}>
                              {otherTaxonomies.slice(0, 2).map((tax, i) => (
                                <div key={i} style={{
                                  display: 'inline-block',
                                  backgroundColor: '#f3f4f6',
                                  padding: '2px 6px',
                                  borderRadius: '4px',
                                  marginRight: '6px',
                                  marginBottom: '4px',
                                  fontSize: '11px'
                                }}>
                                  {tax.desc}
                                </div>
                              ))}
                              {otherTaxonomies.length > 2 && (
                                <div style={{
                                  display: 'inline-block',
                                  color: '#9ca3af',
                                  fontSize: '11px',
                                  backgroundColor: '#f9fafb',
                                  padding: '2px 6px',
                                  borderRadius: '4px'
                                }}>
                                  +{otherTaxonomies.length - 2} more
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* No Results */}
      {searchResults && (!searchResults.results || searchResults.results.length === 0) && !loading && (
        <div className="card">
          <div className="card-content" style={{textAlign: 'center', padding: '40px'}}>
            <div style={{
              width: '80px',
              height: '80px',
              margin: '0 auto 16px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #f3f4f6, #e5e7eb)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Search size={32} color="#9ca3af" />
            </div>
            <div style={{fontSize: '18px', color: '#374151', marginBottom: '8px', fontWeight: '600'}}>
              No providers found
            </div>
            <div style={{fontSize: '14px', color: '#6b7280', marginBottom: '16px'}}>
              Try adjusting your search criteria or check your spelling
            </div>
            <div style={{fontSize: '12px', color: '#9ca3af'}}>
              💡 Tip: Try searching by ZIP code or city for better results
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FindDoctor;
