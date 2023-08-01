import { FC } from 'react';
import { FacebookShareButton, FacebookIcon } from 'react-share';

interface CustomFacebookShareButtonProps {
  url: string;
  thumbUrl: string;
  title: string;
  description: string;
}

const CustomFacebookShareButton: FC<CustomFacebookShareButtonProps> = ({
  url,
  thumbUrl,
  title,
  description,
}) => {
  const handleClick = () => {
    console.log('Custom Facebook share button clicked!');
  };

  return (
    <FacebookShareButton url={url} quote={title} onClick={handleClick}>
      <FacebookIcon size={32} round />
    </FacebookShareButton>
  );
};

export default CustomFacebookShareButton;
