class FilterHelper {
  static getFilterCriteria(status) {
    const validStatuses = ['TODO', 'IN_PROGRESS', 'COMPLETED'];

    // Build the base filter query to exclude soft-deleted tasks
    const filterCriteria = { deletedAt: null };

    // Add status filtering if it is valid
    if (validStatuses.includes(status)) {
      filterCriteria.status = status;
    }

    return filterCriteria;
  }
}

module.exports = FilterHelper;
