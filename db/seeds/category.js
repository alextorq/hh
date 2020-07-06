const vacancies = [
  {
    title: 'Менеджер по продаже запасных частей в офис', price: 'от 45 000 руб.', company: 'https://spb.hh.ru/employer/107439', link: 'https://spb.hh.ru/vacancy/35794986', category: { $oid: '5e471ab2216b5a4885c35dad' },
  },
  {
    title: 'Менеджер (Химик-Эколог)', price: '', company: 'https://spb.hh.ru/employer/2280287', link: 'https://spb.hh.ru/vacancy/35561631', category: { $oid: '5e471ab2216b5a4885c35dad' },
  },
  {
    title: 'Делопроизводитель', price: 'от 30 000 руб.', company: 'https://spb.hh.ru/employer/3148', link: 'https://spb.hh.ru/vacancy/35813827', category: { $oid: '5e471ab2216b5a4885c35dad' },
  },
  {
    title: 'Продавец-консультант (ТЦ « Мега Парнас »)', price: 'от 35 000 руб.', company: 'https://spb.hh.ru/employer/58559', link: 'https://spb.hh.ru/vacancy/35531560', category: { $oid: '5e471ab2216b5a4885c35dad' },
  },
  {
    title: 'Руководитель отдела гипермаркета', price: '46 312-100 000 руб.', company: 'https://spb.hh.ru/employer/1276?dpt=okey-1276-gipm', link: 'https://spb.hh.ru/vacancy/35471027', category: { $oid: '5e471ab2216b5a4885c35dad' },
  },
  {
    title: 'Визажист-консультант бренда SMASHBOX', price: '', company: 'https://spb.hh.ru/employer/62602', link: 'https://spb.hh.ru/vacancy/35739805', category: { $oid: '5e471ab2216b5a4885c35dad' },
  },
  {
    title: 'Продавец - универсал', price: 'от 25 000 руб.', company: 'https://spb.hh.ru/employer/146991', link: 'https://spb.hh.ru/vacancy/29280226', category: { $oid: '5e471ab2216b5a4885c35dad' },
  },
  {
    title: 'Специалист по продажам корпоративным клиентам (малый/ средний бизнес)', price: '', company: 'https://spb.hh.ru/employer/3127?dpt=mgfn-3127-office', link: 'https://spb.hh.ru/vacancy/30787591', category: { $oid: '5e471ab2216b5a4885c35dad' },
  },
  {
    title: 'Продавец непродовольственных товаров (ст.м. Петроградская)', price: '29 200-34 000 руб.', company: 'https://spb.hh.ru/employer/1276?dpt=okey-1276-gipm', link: 'https://spb.hh.ru/vacancy/31238912', category: { $oid: '5e471ab2216b5a4885c35dad' },
  },
  {
    title: 'Дизайнер-консультант кухонь (МЦ Мебель-Сити)', price: '37 000-120 000 руб.', company: 'https://spb.hh.ru/employer/66212', link: 'https://spb.hh.ru/vacancy/32215956', category: { $oid: '5e471ab2216b5a4885c35dad' },
  },
  {
    title: 'Администратор / продавец (м. Фрунзенская)', price: 'до 40 000 руб.', company: 'https://spb.hh.ru/employer/638583', link: 'https://spb.hh.ru/vacancy/33786851', category: { $oid: '5e471ab2216b5a4885c35dad' },
  },
  {
    title: 'Продавец-консультант (ТЦ ПУЛКОВО АУТЛЕТ)', price: 'от 35 000 руб.', company: 'https://spb.hh.ru/employer/3592', link: 'https://spb.hh.ru/vacancy/34035768', category: { $oid: '5e471ab2216b5a4885c35dad' },
  },
  {
    title: 'Специалист по заказу и приемке товара (Санкт-Петербург, шоссе Революции, 41/39)', price: '29 100-33 580 руб.', company: 'https://spb.hh.ru/employer/1942336', link: 'https://spb.hh.ru/vacancy/34385727', category: { $oid: '5e471ab2216b5a4885c35dad' },
  },
  {
    title: 'Кассир-продавец (парт-тайм) (Санкт-Петербург, пр-кт Просвещения, 19)', price: '', company: 'https://spb.hh.ru/employer/1942336', link: 'https://spb.hh.ru/vacancy/34385834', category: { $oid: '5e471ab2216b5a4885c35dad' },
  },
  {
    title: 'Консультант в салон cвязи', price: '45 000-105 000 руб.', company: 'https://spb.hh.ru/employer/4934?dpt=bil-4934-ofsale', link: 'https://spb.hh.ru/vacancy/34499499', category: { $oid: '5e471ab2216b5a4885c35dad' },
  },
  {
    title: 'Продавец-кассир (Санкт-Петербург, Дальневосточный пр-кт, 12)', price: '23 000-29 000 руб.', company: 'https://spb.hh.ru/employer/1942330?dpt=1942330-1942330-magaz', link: 'https://spb.hh.ru/vacancy/34593290', category: { $oid: '5e471ab2216b5a4885c35dad' },
  },
  {
    title: 'Администратор / продавец (м. Выборгская)', price: 'до 40 000 руб.', company: 'https://spb.hh.ru/employer/638583', link: 'https://spb.hh.ru/vacancy/35009574', category: { $oid: '5e471ab2216b5a4885c35dad' },
  },
  {
    title: 'Повар (Большевиков)', price: '30 000-32 000 руб.', company: 'https://spb.hh.ru/employer/1942336', link: 'https://spb.hh.ru/vacancy/35110310', category: { $oid: '5e471ab2216b5a4885c35dad' },
  },
];


const category = [
  {
    title: 'Продажи',
    link: 'https://spb.hh.ru/search/vacancy?area=2&clusters=true&enable_snippets=true&specialization=17&from=cluster_professionalArea&showClusters=true',
    jobs: vacancies,
  },
];

module.exports = category;
