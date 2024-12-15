/*
$products = [  
   ["name" => "Product 1", "price" => 20, "collection" => "MEDIA", "department" => "MEN"],  
   ["name" => "Product 2", "price" => 40, "collection" => "APPAREL", "department" => "WOMEN"],  
   ["name" => "Product 3", "price" => 55, "collection" => "APPAREL", "department" => "UNISEX"],  
   ["name" => "Product 4", "price" => 120, "collection" => "ALBUM MERCH", "department" => "MEN"],  
];  
  
// Get filter parameters  
$$selectedCollections = isset($$ _GET['collection']) ? $_GET['collection'] : [];  
$$selectedPriceRanges = isset($$ _GET['price_range']) ? $_GET['price_range'] : [];  
$$selectedDepartments = isset($$ _GET['department']) ? $_GET['department'] : [];  
  
// Filter products based on selected filters  
$$filteredProducts = array_filter($$ products, function($$product) use ($$ selectedCollections, $$selectedPriceRanges,$$ selectedDepartments) {  
   // Check if product matches collection filter  
   if (!empty($selectedCollections) && !in_array($product['collection'], $selectedCollections)) {  
      return false;  
   }  
  
   // Check if product matches price range filter  
   if (!empty($selectedPriceRanges)) {  
      $$price =$$ product['price'];  
      if (in_array('under25', $selectedPriceRanges) && $price >= 25) {  
        return false;  
      }  
      if (in_array('25to50', $selectedPriceRanges) && ($price < 25 || $price > 50)) {  
        return false;  
      }  
      if (in_array('50to100', $selectedPriceRanges) && ($price < 50 || $price > 100)) {  
        return false;  
      }  
      if (in_array('above100', $selectedPriceRanges) && $price <= 100) {  
        return false;  
      }  
   }  
  
   // Check if product matches department filter  
   if (!empty($selectedDepartments) && !in_array($product['department'], $selectedDepartments)) {  
      return false;  
   }  
  
   return true; // Product matches all selected filters  
});  
  
// Render filtered products  
foreach ($$filteredProducts as$$ product) {  
   echo "<div class='product'>";  
   echo "<h3>{$product['name']}</h3>";  
   echo "<p>Price: \$${$$ product['price']}</p>";  
   echo "<p>Collection: {$product['collection']}</p>";  
   echo "<p>Department: {$product['department']}</p>";  
   echo "</div>";  
}  
*/