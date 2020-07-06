import  {Document} from 'mongoose';

interface IVacancies extends  Document{
  link: string,
  title: string,
  company: string,
  price: string,
  category: Array<any>,
  specialization: Array<any>
}

export default IVacancies;
