import  {Document} from 'mongoose';

interface ISpecialization  extends  Document{
  link: string,
  title: string,
  company: string,
  price: string,
  category: Array<any>,
  specialization: Array<any>
}

export default ISpecialization;
