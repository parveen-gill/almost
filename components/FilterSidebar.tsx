"use client";

export default function FilterSidebar() {
  return (
    <aside className="filter-sidebar">
      <h3>Filters</h3>

      <label>
        Category:
        <select>
          <option>All</option>
          <option>Friendship</option>
          <option>Romance</option>
          <option>Work</option>
        </select>
      </label>

      <label>
        Sort By:
        <select>
          <option>Default</option>
          <option>Most Liked</option>
          <option>Most Commented</option>
        </select>
      </label>

      <button>Apply</button>
    </aside>
  );
}
