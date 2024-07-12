import { DocumentBuilder } from "@nestjs/swagger";

export const documentBuilder = new DocumentBuilder()
    .setTitle('Eigen Backend Test Case')
    .setDescription('Technical Test for Backend Developer at PT EIGEN TRI MATHEMA')
    .setVersion('1.0')
    // .addTag('api')
    .build()