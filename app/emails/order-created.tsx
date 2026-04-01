interface OrderCreatedEmailProps {
  company_name: string
  unsubscribe_url?: string
  facebook_url?: string
  twitter_url?: string
  instagram_url?: string
  customer_name: string
  delivery_date: string
  order_id: string
  order_name: string
  order_quantity: string
  order_single_price: string
  order_price: string
  order_image?: string
  accent_color?: string
  radius?: "sharp" | "medium" | "large"
  bg_color?: string
  show_delivery?: boolean
  show_sign_off?: boolean
  show_social_links?: boolean
}

function formatDate(value: string | undefined) {
  if (!value) return value
  const [year, month, day] = value.split("-").map(Number)
  return new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric", year: "numeric" })
    .format(new Date(year, month - 1, day))
}

const radiusMap = { sharp: "0px", medium: "8px", large: "16px" }
const radiusInnerMap = { sharp: "0px", medium: "6px", large: "10px" }

export function OrderCreatedEmail({
  company_name,
  unsubscribe_url = "#",
  facebook_url,
  twitter_url,
  instagram_url,
  customer_name,
  delivery_date,
  order_id,
  order_name,
  order_quantity,
  order_single_price,
  order_price,
  order_image,
  accent_color = "#18181b",
  radius = "medium",
  bg_color = "#ffffff",
  show_delivery = true,
  show_sign_off = true,
  show_social_links = true,
}: OrderCreatedEmailProps) {
  const hasSocial = facebook_url || twitter_url || instagram_url
  const r = radiusMap[radius]
  const ri = radiusInnerMap[radius]

  return (
    <div style={{ fontFamily: "sans-serif", fontSize: "14px", color: "#3f3f46", maxWidth: "600px", margin: "0 auto", backgroundColor: bg_color, border: "1px solid #e4e4e7", borderRadius: r, overflow: "hidden" }}>

      <div style={{ height: "4px", backgroundColor: accent_color }} />

      <div style={{ padding: "40px 48px 32px", textAlign: "center", borderBottom: "1px solid #f4f4f5" }}>
        <div style={{ display: "inline-block", width: "48px", height: "48px", lineHeight: "48px", borderRadius: "50%", backgroundColor: accent_color, marginBottom: "20px", fontSize: "22px", color: "white", textAlign: "center" }}>
          ✓
        </div>
        <h1 style={{ fontSize: "24px", fontWeight: "700", color: accent_color, margin: "0 0 8px", letterSpacing: "-0.025em" }}>Order confirmed</h1>
        <p style={{ fontSize: "11px", color: "#a1a1aa", letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: "500", margin: 0 }}>
          Order #{order_id}
        </p>
      </div>

      <div style={{ padding: "40px 48px" }}>
        <p style={{ color: "#27272a", fontWeight: "500", margin: "0 0 4px" }}>
          Hi {customer_name},
        </p>
        <p style={{ color: "#71717a", lineHeight: "1.625", margin: "0 0 32px" }}>
          Thank you for your order. We've received it and will send a shipping notification once your items are on the way.
        </p>

        {show_delivery && (
          <div style={{ backgroundColor: "#fafafa", border: "1px solid #f4f4f5", borderRadius: ri, padding: "16px 20px", marginBottom: "32px" }}>
            <p style={{ fontSize: "11px", fontWeight: "600", color: "#71717a", textTransform: "uppercase", letterSpacing: "0.05em", margin: "0 0 2px" }}>Expected delivery</p>
            <p style={{ color: "#27272a", fontWeight: "500", margin: 0 }}>{formatDate(delivery_date)}</p>
          </div>
        )}

        <p style={{ fontSize: "11px", fontWeight: "600", color: "#a1a1aa", textTransform: "uppercase", letterSpacing: "0.1em", margin: "0 0 16px" }}>Order summary</p>

        <table width="100%" cellPadding="0" cellSpacing="0" style={{ borderTop: "1px solid #f4f4f5", paddingTop: "16px" }}>
          <tbody>
            <tr>
              <td style={{ paddingTop: "16px", paddingBottom: "16px", verticalAlign: "middle", width: "80px" }}>
                {order_image ? (
                  <img
                    alt="Order product"
                    src={order_image}
                    width={64}
                    height={64}
                    style={{ borderRadius: ri, objectFit: "cover", border: "1px solid #f4f4f5", display: "block" }}
                  />
                ) : (
                  <div style={{ width: "64px", height: "64px", borderRadius: ri, backgroundColor: "#f4f4f5", border: "1px solid #e4e4e7", textAlign: "center", lineHeight: "64px", color: "#d4d4d8", fontSize: "11px", fontFamily: "monospace" }}>
                    IMG
                  </div>
                )}
              </td>
              <td style={{ paddingTop: "16px", paddingBottom: "16px", paddingLeft: "16px", verticalAlign: "middle" }}>
                <p style={{ fontWeight: "500", color: "#18181b", margin: "0 0 2px" }}>{order_name}</p>
                <p style={{ color: "#a1a1aa", fontSize: "12px", margin: 0 }}>Qty: {order_quantity}</p>
              </td>
              <td style={{ paddingTop: "16px", paddingBottom: "16px", verticalAlign: "middle", textAlign: "right", fontWeight: "600", color: "#18181b", whiteSpace: "nowrap" }}>
                {order_single_price}
              </td>
            </tr>
          </tbody>
        </table>

        <table width="100%" cellPadding="0" cellSpacing="0" style={{ borderTop: "1px solid #f4f4f5" }}>
          <tbody>
            <tr>
              <td style={{ paddingTop: "16px", paddingBottom: "8px", color: "#71717a" }}>Subtotal</td>
              <td style={{ paddingTop: "16px", paddingBottom: "8px", color: "#71717a", textAlign: "right" }}>{order_price}</td>
            </tr>
            <tr style={{ borderTop: "1px solid #f4f4f5" }}>
              <td style={{ paddingTop: "8px", fontWeight: "600", color: "#18181b", fontSize: "16px", borderTop: "1px solid #f4f4f5" }}>Total</td>
              <td style={{ paddingTop: "8px", fontWeight: "600", color: "#18181b", fontSize: "16px", textAlign: "right", borderTop: "1px solid #f4f4f5" }}>{order_price}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {show_sign_off && (
        <div style={{ padding: "32px 48px 40px", borderTop: "1px solid #f4f4f5" }}>
          <p style={{ color: "#71717a", fontSize: "14px", lineHeight: "1.625", margin: "0 0 20px" }}>
            Questions about your order? Reply to this email or visit our{" "}
            <a href="#" style={{ color: accent_color, textDecoration: "underline", textUnderlineOffset: "2px" }}>Help Center</a>.
          </p>
          <p style={{ color: "#27272a", fontWeight: "500", margin: 0 }}>{company_name}</p>
        </div>
      )}

      <div style={{ backgroundColor: "#fafafa", borderTop: "1px solid #f4f4f5", padding: "24px 48px" }}>
        <table width="100%" cellPadding="0" cellSpacing="0">
          <tbody>
            <tr>
              <td style={{ verticalAlign: "middle" }}>
                <p style={{ fontSize: "12px", color: "#a1a1aa", lineHeight: "1.625", margin: 0 }}>
                  You received this email because you placed an order.{" "}
                  <a href={unsubscribe_url} style={{ textDecoration: "underline", textUnderlineOffset: "2px", color: accent_color }}>
                    Unsubscribe
                  </a>
                </p>
              </td>
              {show_social_links && hasSocial && (
                <td style={{ verticalAlign: "middle", textAlign: "right", whiteSpace: "nowrap" }}>
                  {facebook_url && (
                    <a href={facebook_url} style={{ display: "inline-block", width: "28px", height: "28px", lineHeight: "26px", borderRadius: "50%", border: "1px solid #e4e4e7", textAlign: "center", textDecoration: "none", marginLeft: "8px" }}>
                      <svg width="12" height="12" fill="#a1a1aa" viewBox="0 0 24 24" style={{ verticalAlign: "middle" }}><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                    </a>
                  )}
                  {twitter_url && (
                    <a href={twitter_url} style={{ display: "inline-block", width: "28px", height: "28px", lineHeight: "26px", borderRadius: "50%", border: "1px solid #e4e4e7", textAlign: "center", textDecoration: "none", marginLeft: "8px" }}>
                      <svg width="12" height="12" fill="#a1a1aa" viewBox="0 0 24 24" style={{ verticalAlign: "middle" }}><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/></svg>
                    </a>
                  )}
                  {instagram_url && (
                    <a href={instagram_url} style={{ display: "inline-block", width: "28px", height: "28px", lineHeight: "26px", borderRadius: "50%", border: "1px solid #e4e4e7", textAlign: "center", textDecoration: "none", marginLeft: "8px" }}>
                      <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="#a1a1aa" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ verticalAlign: "middle" }}>
                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.5" fill="#a1a1aa"/>
                      </svg>
                    </a>
                  )}
                </td>
              )}
            </tr>
          </tbody>
        </table>
      </div>

    </div>
  )
}
