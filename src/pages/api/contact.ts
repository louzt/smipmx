import type { APIRoute } from 'astro';

export const post: APIRoute = async ({ request }) => {
  try {
    const data = await request.formData();
    const nombre = data.get('nombre');
    const email = data.get('email');
    const telefono = data.get('telefono');
    const mensaje = data.get('mensaje');

    // Here you would typically send this to your email service or database
    // For now, we'll just log it and return success
    console.log({ nombre, email, telefono, mensaje });

    // Return success response
    return new Response(JSON.stringify({
      message: 'Mensaje enviado correctamente'
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    return new Response(JSON.stringify({
      message: 'Error al enviar el mensaje'
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}