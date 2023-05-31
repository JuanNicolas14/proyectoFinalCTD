
# Copiar el archivo JAR al servidor EC2
scp -o "StrictHostKeyChecking no" Backend/target/Backend-0.0.1-SNAPSHOT.jar ubuntu@ec2-3-19-61-55.us-east-2.compute.amazonaws.com:/home/ubuntu

# Conectarse al servidor EC2 y ejecutar el nuevo JAR
ssh -o "StrictHostKeyChecking no" ubuntu@ec2-3-19-61-55.us-east-2.compute.amazonaws.com "sudo systemctl stop bukinfood && sudo systemctl start bukinfood
"
