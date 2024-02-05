import crypto from 'crypto';
import { utf8_to_b64 } from '../utils/utils';

interface LiqPayPaymentProps {
  amount: string;
  currency: string;
  description: string;
}

const LiqPayPayment: React.FC<LiqPayPaymentProps> = ({
  amount,
  currency,
  description,
}) => {
  const publicKey = process.env.NEXT_LIQPAY_PUBLIC_KEY;
  const privateKey = process.env.NEXT_LIQPAY_PRIVATE_KEY;

  const jsonString = {
    public_key: publicKey,
    version: '3',
    action: 'pay',
    amount: amount,
    currency: currency,
    description: description,
    order_id: Math.floor(1 + Math.random() * 900000000),
    result_url: 'http://localhost:3000', //Link to return after succesfull payment
  };

  const data = utf8_to_b64(JSON.stringify(jsonString));
  const signString = privateKey + data + privateKey;
  const sha1 = crypto.createHash('sha1');
  sha1.update(signString);
  const signature = sha1.digest('base64');

  return (
    <form
      method='POST'
      action='https://www.liqpay.ua/api/3/checkout'
      accept-charset='utf-8'
    >
      <input type='hidden' name='data' value={data} />
      <input type='hidden' name='signature' value={signature} />
      <input type='image' src='//static.liqpay.ua/buttons/payUk.png' />
    </form>
  );
};

export default LiqPayPayment;
