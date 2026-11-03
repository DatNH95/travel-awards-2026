type ScreeningCopy = Readonly<{
  stepTitle: string;
  question: string;
  noneLabel: string;
  divider: string;
  ratingTitle: string;
}>;

const destination: ScreeningCopy = {
  stepTitle: 'Chọn điểm đến',
  question: 'Bạn đã từng đến những điểm đến nào dưới đây?',
  noneLabel: 'Chưa từng đến các điểm đến trên',
  divider: 'Hoặc nếu bạn chưa từng đến',
  ratingTitle: 'Đánh giá các điểm đến đã chọn',
};
const personality: ScreeningCopy = {
  stepTitle: 'Chọn nhân vật',
  question: 'Bạn biết đến hoặc từng theo dõi những nhân vật nào dưới đây?',
  noneLabel: 'Chưa biết đến hoặc theo dõi các nhân vật trên',
  divider: 'Hoặc nếu bạn chưa biết đến',
  ratingTitle: 'Đánh giá các nhân vật đã chọn',
};

function experience(noun: string, verb: string): ScreeningCopy {
  return {
    stepTitle: `Chọn ${noun}`,
    question: `Bạn đã từng ${verb} ${noun} nào dưới đây?`,
    noneLabel: `Chưa từng ${verb} các ${noun} trên`,
    divider: `Hoặc nếu bạn chưa từng ${verb}`,
    ratingTitle: `Đánh giá các ${noun} đã chọn`,
  };
}

const copyByCategory: Record<string, ScreeningCopy> = {
  destination,
  'green-destination': destination,
  'tourism-personality': personality,
  'tourism-ambassador': personality,
  'tour-operator': experience('đơn vị lữ hành', 'sử dụng dịch vụ của'),
  hotel: experience('khách sạn', 'lưu trú tại'),
  resort: experience('khu nghỉ dưỡng', 'lưu trú tại'),
  airline: experience('hãng hàng không', 'sử dụng dịch vụ của'),
  'travel-experience': experience('trải nghiệm', 'tham gia'),
  sustainability: experience('sáng kiến', 'biết đến hoặc tham gia'),
  'creative-product': experience('sản phẩm du lịch', 'trải nghiệm'),
  digital: experience('giải pháp', 'sử dụng hoặc trải nghiệm'),
  'community-tourism': experience('làng du lịch', 'đến'),
  'culinary-experience': experience('trải nghiệm ẩm thực', 'tham gia'),
  'tourism-campaign': experience('chiến dịch', 'biết đến hoặc tham gia'),
};

export function getScreeningCopy(categoryId: string): ScreeningCopy {
  return copyByCategory[categoryId] ?? {
    stepTitle: 'Chọn hồ sơ',
    question: 'Chọn những hồ sơ bạn biết đến hoặc đã trải nghiệm',
    noneLabel: 'Chưa biết đến hoặc trải nghiệm các hồ sơ trên',
    divider: 'Hoặc nếu bạn chưa biết đến',
    ratingTitle: 'Đánh giá các hồ sơ đã chọn',
  };
}
