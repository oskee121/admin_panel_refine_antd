import { getNameInitials } from '@/utilities/get-name-initials';
import { Avatar as AntdAvatar, type AvatarProps } from 'antd';

type Props = AvatarProps & {
  name?: string;
};

const customAvatar = ({ name, style, ...rest }: Props) => {
  return (
    <AntdAvatar
      alt={name}
      size="small"
      style={{
        backgroundColor: '#454ff0',
        display: 'flex',
        alignItems: 'center',
        border: 'none',
        ...style,
      }}
      {...rest}
    >
      {getNameInitials(name || '')}
    </AntdAvatar>
  );
};

export default customAvatar;
