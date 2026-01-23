export interface CodeExample {
  id: string;
  title: string;
  description: string;
  language: string;
  code: string;
  category: string;
  tags: string[];
}

export const codeExamples: CodeExample[] = [
  {
    id: '1',
    title: 'REST API with Spring Boot',
    description: 'A simple REST controller demonstrating CRUD operations with Spring Boot',
    language: 'java',
    category: 'Backend',
    tags: ['Spring Boot', 'REST API', 'Java'],
    code: `@RestController
@RequestMapping("/api/users")
public class UserController {
    
    @Autowired
    private UserService userService;
    
    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok(userService.findAll());
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        return userService.findById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }
    
    @PostMapping
    public ResponseEntity<User> createUser(@Valid @RequestBody User user) {
        User created = userService.save(user);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(
        @PathVariable Long id, 
        @Valid @RequestBody User user
    ) {
        return userService.update(id, user)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        userService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}`
  },
  {
    id: '2',
    title: 'React Custom Hook',
    description: 'A reusable custom hook for fetching data with loading and error states',
    language: 'typescript',
    category: 'Frontend',
    tags: ['React', 'TypeScript', 'Hooks'],
    code: `import { useState, useEffect } from 'react';

interface UseFetchResult<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
  refetch: () => void;
}

export function useFetch<T>(url: string): UseFetchResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [refetchIndex, setRefetchIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(\`HTTP error! status: \${response.status}\`);
        }
        
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error'));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, refetchIndex]);

  const refetch = () => setRefetchIndex(prev => prev + 1);

  return { data, loading, error, refetch };
}

// Usage Example:
// const { data, loading, error, refetch } = useFetch<User[]>('/api/users');`
  },
  {
    id: '3',
    title: 'MySQL Query Optimization',
    description: 'Optimized SQL query with proper indexing and joins',
    language: 'sql',
    category: 'Database',
    tags: ['MySQL', 'SQL', 'Optimization'],
    code: `-- Create indexes for better performance
CREATE INDEX idx_user_email ON users(email);
CREATE INDEX idx_order_user_id ON orders(user_id);
CREATE INDEX idx_order_date ON orders(order_date);

-- Optimized query with proper joins and filtering
SELECT 
    u.id,
    u.name,
    u.email,
    COUNT(o.id) as total_orders,
    SUM(o.total_amount) as total_spent,
    MAX(o.order_date) as last_order_date
FROM 
    users u
LEFT JOIN 
    orders o ON u.id = o.user_id
WHERE 
    u.status = 'active'
    AND o.order_date >= DATE_SUB(CURDATE(), INTERVAL 6 MONTH)
GROUP BY 
    u.id, u.name, u.email
HAVING 
    total_orders > 0
ORDER BY 
    total_spent DESC
LIMIT 100;

-- Query execution plan analysis
EXPLAIN SELECT * FROM users WHERE email = 'user@example.com';`
  },
  {
    id: '4',
    title: 'Docker Multi-Stage Build',
    description: 'Optimized Dockerfile for Spring Boot application',
    language: 'dockerfile',
    category: 'DevOps',
    tags: ['Docker', 'Spring Boot', 'DevOps'],
    code: `# Build stage
FROM maven:3.8.6-openjdk-17-slim AS build
WORKDIR /app

# Copy pom.xml and download dependencies
COPY pom.xml .
RUN mvn dependency:go-offline

# Copy source code and build
COPY src ./src
RUN mvn clean package -DskipTests

# Runtime stage
FROM openjdk:17-jdk-slim
WORKDIR /app

# Create non-root user
RUN groupadd -r appuser && useradd -r -g appuser appuser

# Copy jar from build stage
COPY --from=build /app/target/*.jar app.jar

# Change ownership
RUN chown -R appuser:appuser /app
USER appuser

# Expose port
EXPOSE 8080

# Health check
HEALTHCHECK --interval=30s --timeout=3s \\
  CMD curl -f http://localhost:8080/actuator/health || exit 1

# Run application
ENTRYPOINT ["java", "-jar", "app.jar"]`
  },
  {
    id: '5',
    title: 'JWT Authentication Service',
    description: 'JWT token generation and validation in Spring Boot',
    language: 'java',
    category: 'Backend',
    tags: ['Spring Security', 'JWT', 'Authentication'],
    code: `@Service
public class JwtService {
    
    @Value("\${jwt.secret}")
    private String secret;
    
    @Value("\${jwt.expiration}")
    private Long expiration;
    
    public String generateToken(UserDetails userDetails) {
        Map<String, Object> claims = new HashMap<>();
        return createToken(claims, userDetails.getUsername());
    }
    
    private String createToken(Map<String, Object> claims, String subject) {
        return Jwts.builder()
            .setClaims(claims)
            .setSubject(subject)
            .setIssuedAt(new Date(System.currentTimeMillis()))
            .setExpiration(new Date(System.currentTimeMillis() + expiration))
            .signWith(getSignKey(), SignatureAlgorithm.HS256)
            .compact();
    }
    
    public Boolean validateToken(String token, UserDetails userDetails) {
        final String username = extractUsername(token);
        return (username.equals(userDetails.getUsername()) 
            && !isTokenExpired(token));
    }
    
    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }
    
    private <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }
    
    private Claims extractAllClaims(String token) {
        return Jwts.parserBuilder()
            .setSigningKey(getSignKey())
            .build()
            .parseClaimsJws(token)
            .getBody();
    }
    
    private Boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }
    
    private Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }
    
    private Key getSignKey() {
        byte[] keyBytes = Decoders.BASE64.decode(secret);
        return Keys.hmacShaKeyFor(keyBytes);
    }
}`
  },
  {
    id: '6',
    title: 'React Form with Validation',
    description: 'Form handling with Zod validation and error states',
    language: 'typescript',
    category: 'Frontend',
    tags: ['React', 'Zod', 'Forms'],
    code: `import { useState } from 'react';
import { z } from 'zod';

const userSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  age: z.number().min(18, 'Must be 18 or older').max(120),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Must contain uppercase letter')
    .regex(/[0-9]/, 'Must contain number'),
});

type UserForm = z.infer<typeof userSchema>;

export function UserForm() {
  const [formData, setFormData] = useState<Partial<UserForm>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const validated = userSchema.parse(formData);
      console.log('Valid data:', validated);
      // Submit to API
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Record<string, string> = {};
        error.errors.forEach(err => {
          if (err.path[0]) {
            fieldErrors[err.path[0].toString()] = err.message;
          }
        });
        setErrors(fieldErrors);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields with error display */}
    </form>
  );
}`
  }
];
