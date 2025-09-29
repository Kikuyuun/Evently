import React from 'react';

const CategoryGrid = ({ onCategoryClick }) => {
  const categories = [
    {
      name: "Concerts",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA4Ldo2-ttRT3Ty0kZsZ6rQtuTOnGuoLlFGi2wSgvrcXG89b3zElTS_Lw06hfEfvYHPkDb5qbE3cjw9EfZWlRYuQv_Qhv1zo1V7e2QlW1Nqzp09nd-UJuLgAFwL5vXOaVbxLXum2Gss_sISCBAqcM4Wlyn5PiCVcOM3yzjZ2FZfyp2ZcnYF7UnO4RJDHR9hjDr4qyaBt-mVqHO5bzjQrrFyeCqQB-84htIZ6J_IAx9UEslxm_P0z2XaJ3KQyA5DbCrojHWEPZvvgXmM"
    },
    {
      name: "Festivals",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBhpYg0aNljvDwa-QcS1s7PiA1KdCaf_4XuWY9HAItykww1fhFIFraGjOoNMO5aDZANp67rZL3K2TZwppastlOkD2wt9yXxzxLS_kTRf-xXGpFw0OiH_mQ78vkCiLUxFKLwpfy5vwuxwjnTnXo_9i3YpucLjPeSqw_rCzdsilLX57jF7V4XffSIZMZ2eBgD5WfbEX0B4245ixZP0EC9Gsy17u6N6-b9vSZ8vPxFEQvqLqG-GocZQ9GPOWKNtOMmwvvQ90FB46-1AQDY"
    },
    {
      name: "Nightlife",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDsl9w_nQ0LMlm7aPteOxzpHO4pPME1RomYnO2J8-3TEFrloihXJJAsKlY4QNOPaspi9iJNXUmmRiGCNJ-KRdvX-w18e7PCWqWhgOStl5tFsKzoFejhg6VS6l5-KuzxT_G3youF0vM0LC8Ih4FuVJFkLdDLMESV1joHGPnReF06HGfkzR17BN2nysAAAkSMDuzoCyXXf_Wwzw3qIEZfszA82uI2SPwF01kM7ZmK-n-T9mhcRo6P6_twsDCs5dWaEbH61sOEOi8vOvSW"
    },
    {
      name: "Arts & Culture",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuALxg6IrOUgZvL7Q4j2wB-ZNbFB4iSyfD7QUzHBScy0LpmtGNgcYrFL74YRDp_amWgVKAHclp6QeZ9D3BjXdBlWEKZtCVgeL57s0Kfiz6_bNM17T1a-E9S_ehvUHyZQRXR14wjt52n7zju8i62rHQ6859aUZrdJT_2hXYeo_2wIPQqYhUpGk6oGFSzKMCk6gCeWJfQ8HHiOF5wdJ1SxVDUrDRzUF6_5e_Fb2gGWxts6dOyLo1hZOKvSt1si5BsbL5xCHTHTqdz-5pHO"
    },
    {
      name: "Sports",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCv64aom89cpSIfitJ7XYxAx3UeZRdlQQ7CU62GKxH8HV7qioXsTp-P1H5tDzXEGp9YLppRh26PQMkm6hrfk5SiNph4bURbQz5H-GVlvepg9U6j8rdT1xMZBTo5cQeQqG4D4kHxXMHXMwmxB9ukNw3DqyYOlIpLzO1A1IJyVTuSKxF9Ka9EqSL16vAasntKg2hMNWLDN4uKm7XSoNf1QVhKyAXheJS1SIDwslIVZ9fooeUPqlxVa6Lia7Z4yx9vdNjOcCRmlqXlOm3o"
    },
    {
      name: "Comedy",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAdmiNvPg_dHTVg_OHJ7_-C4elV5uN_N2EEzk9iMvgLkn71DYKsxXnttaONMWfqCyhxRQxkURixVtPnCo_EhHdXWOj3k3VwoZz7itj_M3yzWko9RP1-LHZ0SBvVeBIiLkyboj64EmxyDybBG5C13KX6aelxX0_21QaEG3CCqlnwCx1Gj30LcIJWbTGCzMh1LJP1Zc_VpGGUxm-AT-uBKCQ9g0qtS1jwicXRAVS_rxniWqJ2dBDf7KiudRAWN9ithMJn7Rmz2oK1FzlI"
    }
  ];

  return (
    <section>
      <h2 className="mb-4 px-2 text-2xl font-bold text-white text-shadow-sm">Browse by Category</h2>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {categories.map((category, index) => (
          <button 
            key={index} 
            className="group text-left" 
            onClick={() => onCategoryClick && onCategoryClick(category.name)}
          >
            <div className="overflow-hidden rounded-xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <img 
                alt={category.name} 
                className="h-full w-full aspect-square object-cover transition-transform duration-300 group-hover:scale-110" 
                src={category.image} 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <p className="mt-2 text-center text-sm font-semibold text-white">{category.name}</p>
          </button>
        ))}
      </div>
    </section>
  );
};

export default CategoryGrid;
