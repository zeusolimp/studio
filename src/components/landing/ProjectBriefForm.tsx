
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { User, Mail, Building, Calendar, AppWindow, Link as LinkIcon, Palette, PlusCircle, Trash2 } from "lucide-react";

const briefSchema = z.object({
  fullName: z.string().min(1, "Nome completo é obrigatório"),
  email: z.string().email("Email inválido"),
  companyName: z.string().optional(),
  idealTimeframe: z.string().optional(),
  projectType: z.string().min(1, "Deve selecionar um tipo de projeto"),
  requiredSections: z.array(z.string()).optional(),
  referenceSites: z.array(z.object({ value: z.string().url("URL inválida").or(z.literal('')) })).optional(),
  favoriteColors: z.array(z.string()).min(1, "Escolha pelo menos uma cor.").max(3, "Pode escolher até 3 cores."),
  projectDescription: z.string().min(10, "A descrição deve ter pelo menos 10 caracteres."),
});

type BriefFormValues = z.infer<typeof briefSchema>;

const projectTypes = ["Site Corporativo", "E-commerce", "Aplicação Web", "Blog", "Landing Page", "Outro"];
const availableSections = [
    { id: "home", label: "Início" },
    { id: "about", label: "Quem Somos" },
    { id: "services", label: "Serviços" },
    { id: "news", label: "Notícias" },
    { id: "contact", label: "Contacto" },
];
const availableColors = ["#F97316", "#000000", "#8B5CF6", "#EC4899", "#A3A3A3", "#3B82F6", "#FBBF24", "#B91C1C", "#10B981", "#A855F7"];

export default function ProjectBriefForm() {
  const { toast } = useToast();
  const form = useForm<BriefFormValues>({
    resolver: zodResolver(briefSchema),
    defaultValues: {
      fullName: "",
      email: "",
      companyName: "",
      idealTimeframe: "",
      projectType: "",
      requiredSections: [],
      referenceSites: [{ value: "" }],
      favoriteColors: [],
      projectDescription: "",
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: "referenceSites",
    control: form.control,
  });

  function onSubmit(data: BriefFormValues) {
    console.log(data);
    toast({
      title: "Briefing Enviado!",
      description: "Obrigado por preencher o briefing. Entraremos em contacto consigo em breve.",
    });
    form.reset();
  }

  return (
    <Card className="text-left shadow-xl">
      <CardHeader>
        <CardTitle className="font-headline text-2xl">Briefing do Projeto</CardTitle>
        <CardDescription>Por favor, preencha os detalhes abaixo para que possamos entender o seu projeto.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Nome Completo</FormLabel>
                    <FormControl>
                        <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input placeholder="O seu nome" {...field} className="pl-10" />
                        </div>
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Endereço de Email</FormLabel>
                    <FormControl>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input placeholder="o.seu@email.com" {...field} className="pl-10" />
                        </div>
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="companyName"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Nome da Empresa (Opcional)</FormLabel>
                    <FormControl>
                         <div className="relative">
                            <Building className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input placeholder="Acme Inc." {...field} className="pl-10" />
                        </div>
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="idealTimeframe"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Prazo Ideal (Opcional)</FormLabel>
                    <FormControl>
                        <div className="relative">
                            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input placeholder="ex: 3-6 meses" {...field} className="pl-10" />
                        </div>
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <FormField
                    control={form.control}
                    name="projectType"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Tipo de Projeto</FormLabel>
                        <FormControl>
                            <div className="relative">
                                <AppWindow className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <SelectTrigger className="pl-10">
                                        <SelectValue placeholder="Selecione um tipo de projeto" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {projectTypes.map((type) => (
                                            <SelectItem key={type} value={type}>{type}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
                 <FormField
                    control={form.control}
                    name="requiredSections"
                    render={() => (
                        <FormItem>
                            <FormLabel>Secções Necessárias</FormLabel>
                            <div className="flex flex-wrap gap-4 pt-2">
                            {availableSections.map((item) => (
                                <FormField
                                key={item.id}
                                control={form.control}
                                name="requiredSections"
                                render={({ field }) => (
                                    <FormItem key={item.id} className="flex flex-row items-start space-x-3 space-y-0">
                                    <FormControl>
                                        <Checkbox
                                        checked={field.value?.includes(item.id)}
                                        onCheckedChange={(checked) => {
                                            return checked
                                            ? field.onChange([...(field.value || []), item.id])
                                            : field.onChange(field.value?.filter((value) => value !== item.id));
                                        }}
                                        />
                                    </FormControl>
                                    <FormLabel className="font-normal">{item.label}</FormLabel>
                                    </FormItem>
                                )}
                                />
                            ))}
                            </div>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
            
            <FormField
              control={form.control}
              name="referenceSites"
              render={() => (
                <FormItem>
                  <FormLabel>Sites de Referência (Opcional)</FormLabel>
                  {fields.map((field, index) => (
                    <FormField
                      key={field.id}
                      control={form.control}
                      name={`referenceSites.${index}.value`}
                      render={({ field }) => (
                        <FormItem>
                           <FormControl>
                            <div className="relative flex items-center">
                                <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input {...field} placeholder={`https://exemplo.com/${index + 1}`} className="pl-10" />
                                {index > 0 && (
                                    <Button type="button" variant="ghost" size="icon" className="ml-2 text-destructive hover:bg-destructive/10 hover:text-destructive" onClick={() => remove(index)}>
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                )}
                            </div>
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                      )}
                    />
                  ))}
                   <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="mt-2"
                    onClick={() => append({ value: "" })}>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Adicionar outro site
                  </Button>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="favoriteColors"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cores Favoritas (Escolha até 3)</FormLabel>
                  <FormControl>
                    <div className="flex flex-wrap gap-2 pt-2">
                      {availableColors.map((color, index) => (
                         <Checkbox
                            key={`${color}-${index}`}
                            className="h-8 w-8 rounded-full data-[state=checked]:border-primary"
                            style={{ backgroundColor: color }}
                            checked={field.value?.includes(color)}
                            onCheckedChange={(checked) => {
                                const newValue = field.value ? [...field.value] : [];
                                if (checked) {
                                    if (newValue.length < 3) {
                                        newValue.push(color);
                                    }
                                } else {
                                    const index = newValue.indexOf(color);
                                    if (index > -1) {
                                        newValue.splice(index, 1);
                                    }
                                }
                                field.onChange(newValue);
                            }}
                          />
                      ))}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="projectDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrição do Projeto</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Fale-nos sobre os seus objetivos, público-alvo e quaisquer funcionalidades específicas que tenha em mente."
                      rows={6}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Button type="submit" size="lg" className="w-full" style={{ backgroundColor: 'hsl(var(--accent))', color: 'hsl(var(--accent-foreground))' }}>
              Enviar Brief
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
