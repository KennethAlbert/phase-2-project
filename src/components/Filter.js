function Filter({onCategoryChange,onSearchChange}) {
    return (
      <div className="Filter">
        <input type="text" name="search" placeholder="Search..."  onChange={onSearchChange} />
        <select name="filter" onChange={onCategoryChange}>
          <option value="All">Filter by category</option>
          <option value="comedy">comedy</option>
          <option value="thriller">thriller</option>
          <option value="mystery">mystery</option>
          <option value="fantasy">fantasy</option>
          <option value="fiction">fiction</option>
        </select>
      </div>
    );
  }
  
  export default Filter;