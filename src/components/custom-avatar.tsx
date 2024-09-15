import { getNameInitials } from '@/utilities';
import { Avatar as AntdAvatar, AvatarProps } from 'antd' 

type Props = AvatarProps & {
    name?: string;
}

const CustomAvatar = ({ name = '', style, ...rest }: Props) => {
  return (
    <AntdAvatar  
    alt = {name} 
    size = 'default' // small it can be
    style={{   
            backgroundColor: '#f56a00',  
            display: 'flex',
            alignItems: 'center',
            border:'none',
            ...style
          }} 
        {...rest }
    > 
    
    {getNameInitials(name || '')} 
     
    {/* SE */}
    
    </AntdAvatar>
  );
};

export default CustomAvatar