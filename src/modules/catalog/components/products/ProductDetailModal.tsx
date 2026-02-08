import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, Mail } from "lucide-react";
import type { Product, Spec } from "@/modules/catalog/data/products";
import { Card } from "@/components/ui/card";

interface ProductDetailModalProps {
  product: Product | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ProductDetailModal = ({ product, open, onOpenChange }: ProductDetailModalProps) => {
  if (!product) return null;

  const handleWhatsApp = () => {
    const message = encodeURIComponent(
      `Hola, me interesa obtener información sobre: ${product.title}`
    );
    window.open(`https://wa.me/573001234567?text=${message}`, "_blank");
  };

  const handleEmail = () => {
    const subject = encodeURIComponent(`Cotización: ${product.title}`);
    const body = encodeURIComponent(
      `Hola,\n\nMe interesa obtener información y cotización del producto:\n\n${product.title}\n\nQuedo atento a su respuesta.`
    );
    window.open(`mailto:ventas@opingenieria.com?subject=${subject}&body=${body}`, "_blank");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0">
        <DialogHeader className="px-6 pt-6 pb-0">
          <div>
            <DialogTitle className="text-xl md:text-2xl font-heading">
              {product.title}
            </DialogTitle>
            <div className="flex items-center gap-2 mt-2">
              <Badge variant="secondary" className="text-sm">
                {product.categoryId}
              </Badge>
              {product.subcategory && (
                <Badge variant="outline" className="text-sm">
                  {product.subcategory}
                </Badge>
              )}
            </div>
          </div>
        </DialogHeader>

        <div className="grid md:grid-cols-2 gap-6 mt-4 p-6">
          {/* Product Image */}
          <div className="space-y-4">
            <div className="aspect-square rounded-lg overflow-hidden bg-secondary">
              <img
                src={product.images?.[0] || "/placeholder-product.jpg"}
                alt={product.title}
                loading="lazy"
                decoding="async"
                onError={(e) => {
                  const target = e.currentTarget;
                  if (target.src !== "/placeholder-product.jpg") {
                    target.src = "/placeholder-product.jpg";
                  }
                }}
                className="w-full h-full object-contain block"
              />
            </div>

            {/* Image Gallery */}
            {product.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-2">
                {product.images.map((img, index) => (
                  <button
                    key={index}
                    className="flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border"
                  >
                    <img
                      src={img}
                      alt={`${product.title} - ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {product.price && (
              <div className="text-3xl font-bold text-primary">
                {product.price}
              </div>
            )}

            <Card className="p-4">
              <h3 className="font-semibold mb-2">Descripción</h3>
              <p className="text-muted-foreground leading-relaxed">
                {product.description || "Producto de alta calidad para aplicaciones industriales."}
              </p>
            </Card>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Button onClick={handleWhatsApp} className="flex-1 gap-2 bg-accent hover:bg-accent/90">
                <MessageCircle className="h-4 w-4" />
                Cotizar por WhatsApp
              </Button>
              <Button onClick={handleEmail} variant="outline" className="flex-1 gap-2">
                <Mail className="h-4 w-4" />
                Cotizar por Email
              </Button>
            </div>
          </div>
        </div>

        {/* Specifications Table */}
        {product.specs && product.specs.length > 0 && (
          <div className="p-6 border-t">
            <h4 className="font-heading font-semibold text-lg mb-3">
              Especificaciones Técnicas
            </h4>
            <Card>
              <div className="overflow-hidden">
                <table className="w-full">
                  <tbody>
                    {product.specs.map((spec: Spec, index: number) => (
                      <tr
                        key={spec.label}
                        className={index % 2 === 0 ? "bg-secondary" : "bg-muted/50"}
                      >
                        <td className="px-4 py-3 font-medium text-foreground">
                          {spec.label}
                        </td>
                        <td className="px-4 py-3 text-muted-foreground text-right">
                          {spec.value}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ProductDetailModal;