// Category names supplied by the user; detailed criteria remain pending.
export const pillarCategories = [
  'Điểm đến du lịch của năm',
  'Doanh nghiệp lữ hành của năm',
  'Khách sạn của năm',
  'Khu nghỉ dưỡng của năm (Resort)',
  'Hãng hàng không du lịch của năm',
  'Trải nghiệm du lịch của năm',
];
export const pioneeringCategories = [
  'Nhân vật du lịch của năm (Cá nhân)',
  'Sáng kiến du lịch bền vững của năm',
  'Điểm đến du lịch xanh của năm',
  'Sản phẩm du lịch sáng tạo của năm',
  'Chuyển đổi số xuất sắc trong du lịch',
  'Làng du lịch cộng đồng tiêu biểu của năm',
  'Trải nghiệm ẩm thực du lịch của năm',
  'Gương mặt truyền thông du lịch của năm (Đại sứ)',
  'Chiến dịch quảng bá du lịch của năm',
];

export const awardGroups = [{ name: 'Trụ cột', categories: pillarCategories }, { name: 'Tiên phong', categories: pioneeringCategories }];

export function awardCategoryId(groupIndex: number, categoryIndex: number) {
  return `${groupIndex === 0 ? 'tru-cot' : 'tien-phong'}-${categoryIndex + 1}`;
}

export function awardCategoryFromId(id: string) {
  for (const [groupIndex, group] of awardGroups.entries()) {
    const index = group.categories.findIndex((_, categoryIndex) => awardCategoryId(groupIndex, categoryIndex) === id);
    if (index !== -1) return group.categories[index];
  }
  return '';
}

