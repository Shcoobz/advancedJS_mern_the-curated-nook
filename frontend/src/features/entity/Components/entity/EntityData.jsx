function createEntityData(useInventoryQuery, useWishlistQuery, DataTable) {
  return function EntityData({ itemId, onEdit, index, isWishlist, queryName }) {
    const { item: inventoryItem } = useInventoryQuery(queryName, {
      selectFromResult: ({ data }) => ({
        item: data?.entities[itemId],
      }),
    });

    const { item: wishlistItem } = useWishlistQuery(queryName, {
      selectFromResult: ({ data }) => ({
        item: data?.entities[itemId],
      }),
    });

    const item = isWishlist ? wishlistItem : inventoryItem;

    if (!item) return null;

    return <DataTable item={item} onEdit={onEdit} index={index} />;
  };
}

export default createEntityData;
