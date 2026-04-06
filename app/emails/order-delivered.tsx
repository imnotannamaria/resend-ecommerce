interface OrderDeliveredEmailProps {
  company_name: string;
  help_center_url?: string;
  unsubscribe_url?: string;
  twitter_url?: string;
  instagram_url?: string;
  customer_name: string;
  order_id: string;
  delivered_date: string;
  delivery_note?: string;
  review_url?: string;
  order_name: string;
  order_quantity: string;
  order_single_price: string;
  order_price: string;
  order_image?: string;
  accent_color?: string;
  radius?: 'sharp' | 'medium' | 'large';
  bg_color?: string;
  show_delivery?: boolean;
  show_review?: boolean;
  show_sign_off?: boolean;
  show_social_links?: boolean;
}

import {
  Body,
  Button,
  Column,
  Container,
  Head,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Text,
} from '@react-email/components';
import { formatDate } from '@/app/lib/utils';

const radiusMap = { sharp: '0px', medium: '8px', large: '16px' };
const radiusInnerMap = { sharp: '0px', medium: '6px', large: '10px' };

export function OrderDeliveredEmail({
  company_name,
  help_center_url = 'https://example.com/help',
  unsubscribe_url = '#',
  twitter_url,
  instagram_url,
  customer_name,
  order_id,
  delivered_date,
  delivery_note,
  review_url,
  order_name,
  order_quantity,
  order_single_price,
  order_price,
  order_image,
  accent_color = '#18181b',
  radius = 'medium',
  bg_color = '#ffffff',
  show_delivery = true,
  show_review = true,
  show_sign_off = true,
  show_social_links = true,
}: OrderDeliveredEmailProps) {
  const hasSocial = twitter_url || instagram_url;
  const r = radiusMap[radius];
  const ri = radiusInnerMap[radius];

  return (
    <Html lang="en">
      <Head />
      <Preview>
        Your order #{order_id} has arrived! We hope you love it.
      </Preview>
      <Body
        style={{
          backgroundColor: '#f4f4f5',
          margin: '0',
          padding: '32px 0',
          fontFamily: 'sans-serif',
          fontSize: '14px',
          color: '#3f3f46',
        }}
      >
        <Container
          style={{
            maxWidth: '600px',
            backgroundColor: bg_color,
            border: '1px solid #e4e4e7',
            borderRadius: r,
            overflow: 'hidden',
          }}
        >
          <div style={{ height: '4px', backgroundColor: accent_color }} />

          {/* Header */}
          <Section
            style={{
              padding: '40px 48px 32px',
              textAlign: 'center',
              borderBottom: '1px solid #f4f4f5',
            }}
          >
            <Section style={{ marginBottom: '20px' }}>
              <Row>
                <Column style={{ textAlign: 'center' }}>
                  <Text
                    style={{
                      display: 'inline-block',
                      width: '48px',
                      height: '48px',
                      lineHeight: '48px',
                      borderRadius: '50%',
                      backgroundColor: accent_color,
                      textAlign: 'center',
                      fontSize: '22px',
                      margin: '0',
                      padding: '0',
                    }}
                  >
                    🏠
                  </Text>
                </Column>
              </Row>
            </Section>
            <Text
              style={{
                fontSize: '24px',
                fontWeight: '700',
                color: accent_color,
                margin: '0 0 8px',
                letterSpacing: '-0.025em',
              }}
            >
              Your order has arrived!
            </Text>
            <Text
              style={{
                fontSize: '11px',
                color: '#a1a1aa',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                fontWeight: '500',
                margin: 0,
              }}
            >
              Order #{order_id}
            </Text>
          </Section>

          {/* Body */}
          <Section style={{ padding: '40px 48px' }}>
            <Text
              style={{ color: '#27272a', fontWeight: '500', margin: '0 0 4px' }}
            >
              Hi {customer_name},
            </Text>
            <Text
              style={{
                color: '#71717a',
                lineHeight: '1.625',
                margin: '0 0 32px',
              }}
            >
              Your package has been delivered. We hope you love your order! If
              you have any questions or concerns, don't hesitate to reach out.
            </Text>

            {show_delivery && (
              <Section
                style={{
                  backgroundColor: '#fafafa',
                  border: '1px solid #f4f4f5',
                  borderRadius: ri,
                  padding: '16px 20px',
                  marginBottom: '32px',
                }}
              >
                <Text
                  style={{
                    fontSize: '11px',
                    fontWeight: '600',
                    color: '#71717a',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    margin: '0 0 12px',
                  }}
                >
                  Delivery confirmation
                </Text>
                <Section>
                  <Row>
                    <Column
                      style={{
                        color: '#71717a',
                        fontSize: '13px',
                        paddingBottom: delivery_note ? '8px' : '0',
                      }}
                    >
                      Delivered on
                    </Column>
                    <Column
                      style={{
                        color: '#27272a',
                        fontWeight: '600',
                        fontSize: '13px',
                        textAlign: 'right',
                        paddingBottom: delivery_note ? '8px' : '0',
                      }}
                    >
                      {formatDate(delivered_date)}
                    </Column>
                  </Row>
                  {delivery_note && (
                    <Row>
                      <Column style={{ color: '#71717a', fontSize: '13px' }}>
                        Note
                      </Column>
                      <Column
                        style={{
                          color: '#27272a',
                          fontWeight: '500',
                          fontSize: '13px',
                          textAlign: 'right',
                        }}
                      >
                        {delivery_note}
                      </Column>
                    </Row>
                  )}
                </Section>
              </Section>
            )}

            {show_review && review_url && (
              <Section
                style={{
                  textAlign: 'center',
                  backgroundColor: '#fafafa',
                  border: '1px solid #f4f4f5',
                  borderRadius: ri,
                  padding: '24px 20px',
                  marginBottom: '32px',
                }}
              >
                <Text
                  style={{
                    fontSize: '15px',
                    fontWeight: '600',
                    color: '#18181b',
                    margin: '0 0 4px',
                  }}
                >
                  Enjoying your purchase?
                </Text>
                <Text
                  style={{
                    color: '#71717a',
                    fontSize: '13px',
                    margin: '0 0 16px',
                    lineHeight: '1.5',
                  }}
                >
                  Your feedback helps other customers make better decisions.
                </Text>
                <Button
                  href={review_url}
                  style={{
                    backgroundColor: accent_color,
                    color: 'white',
                    textDecoration: 'none',
                    fontSize: '13px',
                    fontWeight: '500',
                    padding: '10px 20px',
                    borderRadius: ri,
                  }}
                >
                  Leave a review ★
                </Button>
              </Section>
            )}

            <Text
              style={{
                fontSize: '11px',
                fontWeight: '600',
                color: '#a1a1aa',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                margin: '0 0 16px',
              }}
            >
              Order summary
            </Text>

            {/* Order item */}
            <Section
              style={{ borderTop: '1px solid #f4f4f5', paddingTop: '16px' }}
            >
              <Row>
                <Column
                  style={{
                    paddingBottom: '16px',
                    verticalAlign: 'middle',
                    width: '80px',
                  }}
                >
                  {order_image ? (
                    <Img
                      alt="Order product"
                      src={order_image}
                      width={64}
                      height={64}
                      style={{
                        borderRadius: ri,
                        objectFit: 'cover',
                        border: '1px solid #f4f4f5',
                        display: 'block',
                      }}
                    />
                  ) : (
                    <Text
                      style={{
                        width: '64px',
                        height: '64px',
                        borderRadius: ri,
                        backgroundColor: '#f4f4f5',
                        border: '1px solid #e4e4e7',
                        textAlign: 'center',
                        lineHeight: '64px',
                        color: '#d4d4d8',
                        fontSize: '11px',
                        fontFamily: 'monospace',
                        margin: 0,
                      }}
                    >
                      IMG
                    </Text>
                  )}
                </Column>
                <Column
                  style={{
                    paddingBottom: '16px',
                    paddingLeft: '16px',
                    verticalAlign: 'middle',
                  }}
                >
                  <Text
                    style={{
                      fontWeight: '500',
                      color: '#18181b',
                      margin: '0 0 2px',
                    }}
                  >
                    {order_name}
                  </Text>
                  <Text
                    style={{ color: '#a1a1aa', fontSize: '12px', margin: 0 }}
                  >
                    Qty: {order_quantity}
                  </Text>
                </Column>
                <Column
                  style={{
                    paddingBottom: '16px',
                    verticalAlign: 'middle',
                    textAlign: 'right',
                    fontWeight: '600',
                    color: '#18181b',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {order_single_price}
                </Column>
              </Row>
            </Section>

            {/* Price summary */}
            <Section style={{ borderTop: '1px solid #f4f4f5' }}>
              <Row>
                <Column
                  style={{
                    paddingTop: '16px',
                    paddingBottom: '8px',
                    color: '#71717a',
                  }}
                >
                  Subtotal
                </Column>
                <Column
                  style={{
                    paddingTop: '16px',
                    paddingBottom: '8px',
                    color: '#71717a',
                    textAlign: 'right',
                  }}
                >
                  {order_price}
                </Column>
              </Row>
              <Row>
                <Column
                  style={{
                    paddingTop: '8px',
                    fontWeight: '600',
                    color: '#18181b',
                    fontSize: '16px',
                    borderTop: '1px solid #f4f4f5',
                  }}
                >
                  Total
                </Column>
                <Column
                  style={{
                    paddingTop: '8px',
                    fontWeight: '600',
                    color: '#18181b',
                    fontSize: '16px',
                    textAlign: 'right',
                    borderTop: '1px solid #f4f4f5',
                  }}
                >
                  {order_price}
                </Column>
              </Row>
            </Section>
          </Section>

          {/* Sign-off */}
          {show_sign_off && (
            <Section
              style={{
                padding: '32px 48px 40px',
                borderTop: '1px solid #f4f4f5',
              }}
            >
              <Text
                style={{
                  color: '#71717a',
                  fontSize: '14px',
                  lineHeight: '1.625',
                  margin: '0 0 20px',
                }}
              >
                Questions about your order? Reply to this email or visit our{' '}
                <Link
                  href={help_center_url}
                  style={{
                    color: accent_color,
                    textDecoration: 'underline',
                    textUnderlineOffset: '2px',
                  }}
                >
                  Help Center
                </Link>
                .
              </Text>
              <Text style={{ color: '#27272a', fontWeight: '500', margin: 0 }}>
                {company_name}
              </Text>
            </Section>
          )}

          {/* Footer */}
          <Section
            style={{
              backgroundColor: '#fafafa',
              borderTop: '1px solid #f4f4f5',
              padding: '24px 48px',
            }}
          >
            <Row>
              <Column style={{ verticalAlign: 'middle' }}>
                <Text
                  style={{
                    fontSize: '12px',
                    color: '#a1a1aa',
                    lineHeight: '1.625',
                    margin: 0,
                  }}
                >
                  You received this email because you placed an order.{' '}
                  <Link
                    href={unsubscribe_url}
                    style={{
                      textDecoration: 'underline',
                      textUnderlineOffset: '2px',
                      color: accent_color,
                    }}
                  >
                    Unsubscribe
                  </Link>
                </Text>
              </Column>
              {show_social_links && hasSocial && (
                <Column style={{ verticalAlign: 'middle', textAlign: 'right' }}>
                  <Section>
                    <Row>
                      {twitter_url && (
                        <Column style={{ paddingLeft: '8px', width: '36px' }}>
                          <Link
                            href={twitter_url}
                            aria-label="Twitter"
                            style={{ textDecoration: 'none' }}
                          >
                            <div
                              style={{
                                width: '28px',
                                height: '28px',
                                borderRadius: '50%',
                                border: '1px solid #e4e4e7',
                                textAlign: 'center',
                                lineHeight: '28px',
                                fontSize: '13px',
                                color: '#a1a1aa',
                              }}
                            >
                              𝕏
                            </div>
                          </Link>
                        </Column>
                      )}
                      {instagram_url && (
                        <Column style={{ paddingLeft: '8px', width: '36px' }}>
                          <Link
                            href={instagram_url}
                            aria-label="Instagram"
                            style={{ textDecoration: 'none' }}
                          >
                            <div
                              style={{
                                width: '28px',
                                height: '28px',
                                borderRadius: '50%',
                                border: '1px solid #e4e4e7',
                                textAlign: 'center',
                                lineHeight: '28px',
                                fontSize: '12px',
                              }}
                            >
                              📷
                            </div>
                          </Link>
                        </Column>
                      )}
                    </Row>
                  </Section>
                </Column>
              )}
            </Row>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}
