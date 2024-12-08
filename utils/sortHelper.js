class SortHelper {
  static getSortCriteria(sortField, sortOrder) {
    const validFields = ['createdAt', 'dueDate'];
    const validOrder = ['asc', 'desc'];

    // Validate sort field and order
    if (!validFields.includes(sortField)) sortField = 'createdAt';
    if (!validOrder.includes(sortOrder)) sortOrder = 'asc';

    // Return the sort criteria
    return { [sortField]: sortOrder === 'asc' ? 1 : -1 };
  }
}

module.exports = SortHelper;
